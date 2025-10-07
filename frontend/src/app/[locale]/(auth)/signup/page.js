'use client';

import React, { useState, useEffect } from 'react';
import useGeoLocation from '@/common/hook/useGeoLocation';
import CustomToast from '@/common/components/custom-toaster';
import { SIGNUP } from '@/components/LoginSignup/constant';
import UserForm from '@/components/LoginSignup/UserForm';

const Signup = () => {
  const location = useGeoLocation();
  const [geoInfo, setGeoInfo] = useState(null);
  const [geoBlock, setGeoBlock] = useState(false);
  const [toastState, setToastState] = useState({
    showToast: false,
    message: '',
    status: '',
  });

  useEffect(() => {
    async function fetchGeo() {
      if (
        location.loaded &&
        !location.error &&
        location.coordinates.lat &&
        location.coordinates.lng
      ) {
        try {
          // Fetch client IP in parallel with geolocation
          const [ipResponse, geoResponse] = await Promise.all([
            fetchClientIP(),
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coordinates.lat}&longitude=${location.coordinates.lng}&localityLanguage=en`
            ),
          ]);

          const clientIP = ipResponse;
          const geoData = await geoResponse.json();

          const geo = {
            country_code: geoData.countryCode,
            state_code: geoData.principalSubdivisionCode?.split('-')[1],
            state_name: geoData.principalSubdivision,
          };
          setGeoInfo(geo);

          if (isBlockedRegion(geo, clientIP)) {
            setGeoBlock(true);
            setToastState({
              showToast: true,
              message: 'Access from your region is restricted.',
              status: 'error',
            });
          }
        } catch (error) {
          console.error('Error fetching geo/IP data:', error);
        }
      }
    }
    fetchGeo();
  }, [location]);

  return (
    <>
      <div className="max-w-2xl w-full min-h-screen flex flex-col items-center justify-center mx-auto">
        <UserForm
          controls={SIGNUP}
          isSignUp
          setToastState={setToastState}
          geoInfo={geoInfo}
          isBlocked={geoBlock}
        />
      </div>

      <CustomToast
        showToast={toastState.showToast}
        setShowToast={(val) =>
          setToastState((prev) => ({ ...prev, showToast: val }))
        }
        message={toastState.message}
        status={toastState.status}
        duration={2000}
      />
    </>
  );
};

export default Signup;
