import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Faculty/Sidebar/sidebar';

export default function Result() {
  const [results, setResults] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    getAttemptedExams();
  }, []);

  async function getAttemptedExams() {
    try {
      const response = await fetch(
        'http://localhost:3000/exam/attempted-exams',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      setResults(data.data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 flex flex-col">
        <p className="text-4xl font-semibold text-gray-500 pb-5 border-b">
          Your Results
        </p>
        <div className="mt-5 bg-white w-full flex-1 ">
          {results.length == 0 && (
            <p className="text-center mt-4 text-xl text-gray-400">
              No results found
            </p>
          )}
          {results.map((exam, idx) => (
            <div
              className="p-4 rounded border w-full mb-4 flex items-center cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                if (exam.status == 'attempted')
                  navigateTo('/report', { state: { exam } });
                else alert('Exam not attempted');
              }}
              key={idx}
            >
              <p className="pe-4 text-gray-300 font-semibold text-xs">
                {idx + 1}
              </p>
              <div className="flex-1 text-xl font-semibold text-gray-700">
                <div className="text-xs font-light uppercase text-gray-600">
                  Title
                </div>
                {exam.title}
              </div>
              <div className="flex-1 text-sm text-gray-500 font-medium">
                <div className="text-xs font-light uppercase text-gray-600">
                  Attempted On
                </div>
                {new Date(exam.attemptedOn).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex-1 text-sm text-gray-500 font-medium">
                <div className="text-xs font-light uppercase text-gray-600">
                  Duration
                </div>
                {exam.duration + ' MINUTE(s)'}
              </div>
              <div className="w-1/6 flex justify-end">
                <p
                  className={`w-fit  px-4 py-2 rounded-full text-xs font-medium ${
                    exam.status == 'attempted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {exam.status == 'attempted' ? 'Attempted' : 'Not Attempted'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
