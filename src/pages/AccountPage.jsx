import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const { logged } = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div>AccountPage</div>
  )
}
