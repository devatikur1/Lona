import React, { useState } from 'react'
import { AppContext } from './AppContext'

export default function AppContextProvider({children}) {
    const [showHeader, setShowHeader] = useState(false)
  return (
    <AppContext.Provider value={{ showHeader, setShowHeader }}>
      {children}
    </AppContext.Provider>
  );
}
