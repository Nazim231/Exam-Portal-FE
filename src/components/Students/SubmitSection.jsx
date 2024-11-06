import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubmitSection() {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { data } = location.state;
  console.log(location.state);

  const handleBack = (e) => {
    e.preventDefault();
    navigateTo(-1);
  };

  const submitSection = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/exam/section/submit-section';
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      const res = await response.json();
      if (!response.ok) {
        alert(res.message);
        return;
      }

      navigateTo('/attempt-exam', {
        state: {
          examId: data.examId,
          redirectedFrom: 'submit-section'
        }
      });

    } catch (err) {
      alert(err.message);
      console.log('Error: ', err.message);
    }
  };

  return (
    <div className="flex w-full h-svh justify-center items-center">
      <div>
        <p className="text-2xl font-medium text-gray-600">
          Are you sure you want to mark the current sections as{' '}
          <span className="font-black text-black">finished?</span>
        </p>
        <p className="mt-4 text-gray-300 mb-2 text-center">Summary:</p>
        <div className="flex gap-4 border rounded-xl">
          <p className="text-green-700 font-bold text-3xl p-4 flex-1 text-center border-e">
            {data.attempted} <br /> Attempted
          </p>
          <p className="text-yellow-700 font-bold text-3xl p-4 flex-1 text-center border-e ">
            {data.skipped} <br /> Skipped
          </p>
          <p className="text-red-700 font-bold text-3xl p-4 flex-1 text-center ">
            {data.unattempted} <br /> Unattempted
          </p>
        </div>
        <div className="flex gap-4 mt-6 justify-center items-center">
          <button onClick={submitSection} className="bg-green-600 px-6 py-3 text-white rounded-md text-xl font-semibold">
            Finish Section
          </button>
          <button
            className="bg-gray-600 px-6 py-3 text-white rounded-md text-xl font-semibold"
            onClick={handleBack}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
