import React from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { onMessage, messaging } from "../config/firebase";

const NotificationContext = React.createContext(null);


export const useNotification = () => React.useContext(NotificationContext);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = React.useState(null);

    React.useEffect(() => {
        // onMessage(messaging, (payload) => {
        //     setNotification(payload.notification);
        // })
    }, [])

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}