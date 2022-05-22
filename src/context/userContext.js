import React, { createContext, useState } from 'react'
import Notification from '../components/notification/Notification'

export const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    
    const [isNotificationVisible, setIsNotificationVisible] = useState(false)
    const [notificationText, setNotificationText] = useState('"Dishname" added to your order')
    const [systemLang, setSystemLang] = useState('En')
    const [currency, setCurrency] = useState('USD')

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    const showNotification = (text) => {
      text && setNotificationText(text)
      setIsNotificationVisible(true)
      setTimeout(() => {
        setIsNotificationVisible(isDishCardVisible => !isDishCardVisible)
      }, 2000)
    }

    return (
      <UserContext.Provider
        value={{
          showNotification,
          systemLang,
          setSystemLang,
          currency,
          setCurrency,
          isDarkMode
        }}
      >
        {children}
        <Notification
          isVisible={isNotificationVisible} 
          text={notificationText}
          isDarkMode={isDarkMode}
        />
      </UserContext.Provider>
    )
}