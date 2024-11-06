import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Faculty/Sidebar/sidebar';

export default function Report() {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { exam } = location.state;
  const [counts, setCounts] = useState({
    attemptedCount: 0,
    correctCount: 0,
  });
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getExamReport();
    getDetailedReport();
  }, []);

  async function getExamReport() {
    if (!exam) {
      alert('No Exam ID found');
      navigateTo('/results');
    }
    try {
      const url = `http://localhost:3000/exam/result/${exam.examId}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        navigateTo(-1);
      }
      setCounts({ ...data.data[0] });
    } catch (err) {
      alert(err.message);
      navigateTo(-1);
    }
  }

  async function getDetailedReport() {
    setSections([]);
    try {
      const url = `http://localhost:3000/exam/detailed-result/${exam.examId}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        navigateTo(-1);
      }
      
      data.data.forEach((d) => {
        setSections((prev) => [...prev, d.section]);
      });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 overflow-y-scroll">
        <div className="pb-5 border-b flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-gray-400 font-light">
              Exam Name
            </p>
            <p className="text-2xl font-semibold text-gray-700">{exam.title}</p>
          </div>
          <div>
            <p className="text-gray-700 text-sm font-medium">
              <span className="text-xs uppercase font-light text-gray-400">
                Duration:
              </span>
              {exam.duration} Minute(s)
            </p>
            <p className="text-gray-700 text-sm font-medium">
              <span className="text-xs uppercase font-light text-gray-400">
                Exam Date:
              </span>
              {new Date(exam.attemptedOn).toDateString()}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <p className="text-xl font-semibold">Summary</p>
            <div className="flex gap-4 border rounded mt-2">
              <p className="text-green-700 font-bold text-lg p-4 flex-1 text-center border-e">
                {counts.correctCount} <br /> Correct
              </p>
              <p className="text-red-700 font-bold text-lg p-4 flex-1 text-center border-e">
                {counts.attemptedCount - counts.correctCount} <br /> Incorrect
              </p>
              <p className="text-yellow-700 font-bold text-lg p-4 flex-1 text-center border-e ">
                {counts.skippedCount} <br /> Skipped
              </p>
              <p className="text-gray-700 font-bold text-lg p-4 flex-1 text-center ">
                {counts.unattemptedCount} <br /> Unattempted
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-center text-2xl font-medium uppercase mb-5 text-gray-400">
            Detailed Result
          </p>
          {sections.length > 0 &&
            sections.map((sec, idx) => {
              return (
                <div className="mb-3 border rounded" key={idx}>
                  <p className="text-2xl font-semibold p-3 bg-gray-100 border-">
                    {sec.title}
                  </p>
                  {sec.questions.map((ques, idx) => {
                    return (
                      <div
                        className="flex justify-between items-center gap-4 px-3 py-4 border-t"
                        key={idx}
                      >
                        <div className="text-lg font-medium text-gray-500">
                          {ques.title}
                        </div>
                        <div>
                          {(() => {
                            if (ques.status == 'attempted') {
                              if (ques.result == 'correct') {
                                return (
                                  <p className="text-green-600 font-medium">
                                    Correct
                                  </p>
                                );
                              } else {
                                return (
                                  <p className="text-red-600 font-medium">
                                    Wrong Answer
                                  </p>
                                );
                              }
                            }
                            if (ques.status == 'unattempted') {
                              return (
                                <p className="text-gray-600 font-medium">
                                  Not Attempted
                                </p>
                              );
                            }
                            if (ques.status == 'skipped') {
                              return (
                                <p className="text-yellow-600 font-medium">
                                  Skipped
                                </p>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
