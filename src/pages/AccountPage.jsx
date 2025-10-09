import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div>AccountPage</div>
  )
}
