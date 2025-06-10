import { db, analytics, isInitialized, checkFirebaseConnection } from '../firebase/config';
import { collection, addDoc, serverTimestamp, FirestoreError } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { FormData } from '../types';

const safeLogEvent = (eventName: string, eventParameters?: Record<string, string | number | boolean>) => {
    if (analytics !== null) {
        try {
            logEvent(analytics, eventName, eventParameters);
        } catch (error) {
            console.warn('Analytics event failed:', error);
        }
    }
};

const validateFormData = (data: FormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.name?.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (!data.game?.trim()) {
        errors.push('Game is required');
    }
    
    if (data.message && data.message.length > 1000) {
        errors.push('Message is too long (max 1000 characters)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export const submitForm = async (formData: FormData) => {
    try {
        // Check Firebase initialization
        if (!isInitialized) {
            throw new Error('Firebase is not initialized');
        }

        // Validate connection
        const isConnected = await checkFirebaseConnection();
        if (!isConnected) {
            throw new Error('No connection to Firebase');
        }

        // Validate form data
        const validation = validateFormData(formData);
        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        console.log('Attempting to submit form:', formData);

        // Prepare data with metadata
        const formDataWithMetadata = {
            ...formData,
            timestamp: serverTimestamp(),
            status: 'new',
            email: formData.email.toLowerCase().trim(),
            name: formData.name.trim(),
            game: formData.game.trim(),
            message: formData.message?.trim() || ''
        };

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'formSubmissions'), formDataWithMetadata);
        console.log('Form submitted successfully:', docRef.id);

        // Log analytics event
        safeLogEvent('form_submission', {
            form_id: docRef.id,
            form_type: formData.game ? 'game_boost' : 'general',
            game: formData.game
        });

        return { 
            success: true, 
            id: docRef.id,
            message: 'Form submitted successfully'
        };
    } catch (error: unknown) {
        console.error('Error submitting form:', {
            error,
            errorCode: error instanceof FirestoreError ? error.code : 'unknown',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            formData
        });

        // Handle specific Firebase errors
        if (error instanceof FirestoreError) {
            switch (error.code) {
                case 'permission-denied':
                    return { 
                        success: false, 
                        error: 'Permission denied. Please try again later.',
                        code: error.code 
                    };
                case 'unavailable':
                    return { 
                        success: false, 
                        error: 'Service temporarily unavailable. Please try again later.',
                        code: error.code 
                    };
                default:
                    return { 
                        success: false, 
                        error: 'An error occurred while submitting the form. Please try again.',
                        code: error.code 
                    };
            }
        }

        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            code: 'unknown'
        };
    }
}; 