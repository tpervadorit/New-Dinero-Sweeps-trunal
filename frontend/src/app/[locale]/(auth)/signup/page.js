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

  async function fetchClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to fetch client IP:', error);
      return null;
    }
  }

  function isBlockedRegion(geo, clientIP = null) {
    if (!geo) return true;

    const stateCode = normalizeState(geo.state_code, geo.state_name);

    // Check if IP is in allowed list (bypasses all other checks)
    if (clientIP && ALLOWED_IPS.includes(clientIP)) {
      return false;
    }

    // Block if not in allowed list
    if (!ALLOWED_COUNTRIES.includes(geo.country_code)) return true;

    // Block explicit restricted countries
    if (BLOCKED_COUNTRIES.includes(geo.country_code)) return true;

    // India is fully allowed
    if (geo.country_code === 'IN') return false;

    // For US, only allow states not in BLOCKED_STATES
    if (geo.country_code === 'US' && BLOCKED_STATES.includes(stateCode))
      return true;

    return false; // Otherwise allowed
  }

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
