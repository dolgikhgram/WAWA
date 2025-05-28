import { analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';

export const trackPageView = (pageName: string) => {
    logEvent(analytics, 'page_view', {
        page_name: pageName,
        page_location: window.location.href,
        page_title: document.title
    });
};

export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
    logEvent(analytics, 'button_click', {
        button_name: buttonName,
        button_location: buttonLocation
    });
};

export const trackGameSelection = (gameName: string) => {
    logEvent(analytics, 'game_selected', {
        game_name: gameName
    });
};

export const trackFormStart = (formType: string) => {
    logEvent(analytics, 'form_start', {
        form_type: formType
    });
};

export const trackFormComplete = (formType: string, success: boolean) => {
    logEvent(analytics, 'form_complete', {
        form_type: formType,
        success: success
    });
};

export const trackMenuOpen = () => {
    logEvent(analytics, 'menu_open');
};

export const trackMenuClose = () => {
    logEvent(analytics, 'menu_close');
}; 