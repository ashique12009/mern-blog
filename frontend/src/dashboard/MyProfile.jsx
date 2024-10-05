import React from 'react'
import { useAuth } from '../context/AuthProvider';

const MyProfile = () => {
    const { profile } = useAuth();
    console.log('PROFILE', profile);

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="">
                    <div>
                        { profile?.photo && <img src={`${backendBaseUrl}/${profile?.photo}`} alt="avatar" className="w-48 h-48 object-contain mx-auto" /> }
                    </div>
                    <div className="px-6 py-8 mt-2">
                        <h2 className="text-center text-2xl font-semibold text-gray-800">
                            {profile?.name}
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                            {profile?.email}
                        </p>
                        <p className="text-center text-gray-600 mt-2">
                            {profile?.phone}
                        </p>
                        <p className="text-center text-gray-600 mt-2">
                            {profile?.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile