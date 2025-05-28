import { db, analytics } from '../firebase/config';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    limit, 
    serverTimestamp,
    where 
} from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

export interface Review {
    id?: string;
    name: string;
    rating: number;
    text: string;
    game?: string;
    timestamp?: any;
    status: 'pending' | 'approved' | 'rejected';
}

export const submitReview = async (reviewData: Omit<Review, 'id' | 'timestamp' | 'status'>) => {
    try {
        const reviewWithMetadata = {
            ...reviewData,
            timestamp: serverTimestamp(),
            status: 'pending'
        };

        const docRef = await addDoc(collection(db, 'reviews'), reviewWithMetadata);

        // Логируем событие в аналитике
        logEvent(analytics, 'review_submission', {
            review_id: docRef.id,
            game: reviewData.game || 'general'
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting review:', error);
        return { success: false, error };
    }
};

export const getApprovedReviews = async (game?: string) => {
    try {
        let reviewsQuery = query(
            collection(db, 'reviews'),
            where('status', '==', 'approved'),
            orderBy('timestamp', 'desc'),
            limit(10)
        );

        if (game) {
            reviewsQuery = query(
                reviewsQuery,
                where('game', '==', game)
            );
        }

        const querySnapshot = await getDocs(reviewsQuery);
        const reviews: Review[] = [];

        querySnapshot.forEach((doc) => {
            reviews.push({
                id: doc.id,
                ...doc.data()
            } as Review);
        });

        // Логируем событие в аналитике
        logEvent(analytics, 'reviews_viewed', {
            game: game || 'all',
            count: reviews.length
        });

        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}; 