import { analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

// Event names
export const FORM_EVENTS = {
    FORM_START: 'form_start',
    FORM_COMPLETE: 'form_complete',
    FORM_ERROR: 'form_error',
    FORM_ABANDON: 'form_abandon'
} as const;

// Form types
export const FORM_TYPES = {
    BOOST_REGISTRATION: 'boost_registration',
    CONTACT_FORM: 'contact_form'
} as const;

const safeLogEvent = (eventName: string, eventParameters?: Record<string, string | number | boolean>) => {
    if (analytics !== null) {
        try {
            logEvent(analytics, eventName, eventParameters);
        } catch (error) {
            console.warn('Analytics event failed:', error);
        }
    }
};

export const trackPageView = (pageName: string) => {
    safeLogEvent('page_view', {
        page_name: pageName,
        page_location: window.location.href,
        page_title: document.title
    });
};

export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
    safeLogEvent('button_click', {
        button_name: buttonName,
        button_location: buttonLocation
    });
};

export const trackGameSelection = (gameName: string) => {
    safeLogEvent('game_selected', {
        game_name: gameName
    });
};

/**
 * Track when a user starts filling out a form
 * @param formType - Type of the form (boost_registration or contact_form)
 */
export const trackFormStart = (formType: typeof FORM_TYPES[keyof typeof FORM_TYPES]) => {
    try {
        safeLogEvent(FORM_EVENTS.FORM_START, {
            form_type: formType,
            timestamp: new Date().toISOString()
        });
        console.log('Form start tracked:', formType);
    } catch (error) {
        console.error('Error tracking form start:', error);
    }
};

/**
 * Track when a user successfully submits a form
 * @param formType - Type of the form
 * @param success - Whether the submission was successful
 * @param formId - Optional form submission ID
 */
export const trackFormComplete = (
    formType: typeof FORM_TYPES[keyof typeof FORM_TYPES],
    success: boolean,
    formId?: string
) => {
    try {
        const eventParams: Record<string, string | number | boolean> = {
            form_type: formType,
            timestamp: new Date().toISOString()
        };
        
        if (formId) {
            eventParams.form_id = formId;
        }
        
        safeLogEvent(success ? FORM_EVENTS.FORM_COMPLETE : FORM_EVENTS.FORM_ERROR, eventParams);
        console.log('Form completion tracked:', { formType, success, formId });
    } catch (error) {
        console.error('Error tracking form completion:', error);
    }
};

/**
 * Track when a user abandons a form
 * @param formType - Type of the form
 * @param filledFields - Number of fields filled before abandonment
 */
export const trackFormAbandon = (
    formType: typeof FORM_TYPES[keyof typeof FORM_TYPES],
    filledFields: number
) => {
    try {
        safeLogEvent(FORM_EVENTS.FORM_ABANDON, {
            form_type: formType,
            filled_fields: filledFields,
            timestamp: new Date().toISOString()
        });
        console.log('Form abandonment tracked:', { formType, filledFields });
    } catch (error) {
        console.error('Error tracking form abandonment:', error);
    }
};

export const trackMenuOpen = () => {
    safeLogEvent('menu_open');
};

export const trackMenuClose = () => {
    safeLogEvent('menu_close');
}; 