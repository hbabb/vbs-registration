export const trackEvent = (
    eventName: string,
    parameters?: Record<string, unknown>,
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};

export const trackRegistration = (childrenCount: number) => {
    trackEvent('registration_complete', {
        event_category: 'VBS Registration',
        event_label: 'Form Submission',
        value: childrenCount,
        custom_parameters: {
            children_count: childrenCount,
            has_multiple_children: childrenCount > 1,
        },
    });
};

export const trackFormStep = (step: string) => {
    trackEvent('form_progress', {
        event_category: 'VBS Registration',
        event_label: step,
        step_name: step,
    });
};
