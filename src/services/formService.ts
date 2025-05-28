import { db, analytics } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

export interface FormData {
    name: string;
    email: string;
    phone: string;
    message?: string;
    game?: string;
}

export const submitForm = async (formData: FormData) => {
    try {
        // Добавляем временную метку к данным формы
        const formDataWithTimestamp = {
            ...formData,
            timestamp: serverTimestamp(),
            status: 'new'
        };

        // Сохраняем в Firestore
        const docRef = await addDoc(collection(db, 'formSubmissions'), formDataWithTimestamp);

        // Логируем событие в аналитике
        logEvent(analytics, 'form_submission', {
            form_id: docRef.id,
            form_type: formData.game ? 'game_boost' : 'general'
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error };
    }
}; 