// Общие типы для приложения

export interface FormData {
    name: string;
    email: string;
    game: string;
    message?: string;
}

export interface Review {
    id?: string;
    name: string;
    rating: number;
    text: string;
    game?: string;
    timestamp?: unknown;
    status: 'pending' | 'approved' | 'rejected';
}

export interface Game {
    id: number;
    image: string;
    altText: string;
    name: string;
}

export interface GameOption {
    value: string;
    label: string;
}

// Типы для аналитики
export const FORM_EVENTS = {
    FORM_START: 'form_start',
    FORM_COMPLETE: 'form_complete',
    FORM_ERROR: 'form_error',
    FORM_ABANDON: 'form_abandon'
} as const;

export const FORM_TYPES = {
    BOOST_REGISTRATION: 'boost_registration',
    CONTACT_FORM: 'contact_form'
} as const;

export type FormEventType = typeof FORM_EVENTS[keyof typeof FORM_EVENTS];
export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES]; 