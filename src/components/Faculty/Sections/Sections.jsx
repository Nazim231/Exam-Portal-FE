import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '/src/components/Faculty/Sidebar/sidebar';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SectionForm from './SectionForm';
import Button from '../../ui/Button';

function Sections() {
  const examId = useParams().examId;
  const [existingSections, setExistingSections] = useState([]);
  useEffect(() => {
    async function checkExamExistence() {
      try {
        const response = await fetch(`http://localhost:3000/exam/${examId}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(`Exam Error:: ${data.message}`);
          navigateTo('/exams');
        }
      } catch (err) {
        console.log(`Exam Error:: ${err.message}`);
        navigateTo('/exams');
      }
    }

    async function getSections() {
      try {
        const response = await fetch(
          `http://localhost:3000/exam/${examId}/section`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(`${data.message}`);
          return;
        }
        setExistingSections(data.data);
      } catch (ex) {
        console.log(`Get Sections Error::: ${ex.message}`);
        alert('Error: ', ex.message);
      }
    }
    checkExamExistence();
    getSections();
  }, [examId]);
  const navigateTo = useNavigate();

  const [sections, setSections] = useState({});
  const handleAddSection = () => {
    setSections((prev) => ({ ...prev, [Object.keys(prev).length + 1]: {} }));
  };

  const handleValueChanges = (index, values) => {
    setSections((prev) => ({ ...prev, [index]: values }));
  };

  const handleSectionDelete = (index) => {
    setSections((prev) => {
      const newSections = { ...prev };
      delete newSections[index];
      return newSections;
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (Object.keys(sections).length == 0 && existingSections.length == 0) {
      alert('Exam should contain at least 1 section');
      return;
    }

    if (Object.keys(sections).length > 0) {
      try {
        const response = await fetch(
          'http://localhost:3000/exam/section/create',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: JSON.stringify(sections),
              examId: examId,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert('Failed to create section');
          console.log(`Add Exam Section Error:: ${data.message}`);
          return;
        }

        alert('Section created successfully');
        navigateTo(`/exams/${examId}/sections/examinees`);
      } catch (err) {
        alert(`Failed to create section ${err.message}`);
        console.log(`Add Exam Section Error:: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col p-4 w-full h-screen gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b py-4">
          <h1 className="text-4xl font-bold text-gray-700">Exam Sections.</h1>
          <div>
            <button
              type="button"
              className="flex items-center border border-blue-700 text-blue-700 px-3 py-2 rounded hover:text-white hover:bg-blue-700 text-sm"
              onClick={handleAddSection}
            >
              <PlusCircleIcon className="size-4 me-2" />
              Add Section
            </button>
          </div>
        </div>
        {/* Existing Sections */}
        {existingSections.length > 0 ? (
          <div className="existingSections">
            <p className="font-bold text-xl text-gray-500 mb-4">
              Existing Sections
            </p>
            {existingSections.map((section) => {
              return (
                <div key={section._id} className="border rounded-lg p-4 mt-2">
                  <p className="text-blue-500 font-semibold">{section.title}</p>
                  <p>
                    Duration:{' '}
                    <span className="font-semibold">{`${section.duration} min`}</span>
                  </p>
                  <p>
                    Allowed Questions:{' '}
                    <span className="font-semibold">
                      {section.num_question}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {/* New Sections */}
        <div
          id="sectionsContainer"
          className="flex flex-col flex-1 gap-4 overflow-y-auto"
        >
          {Object.entries(sections).map(([key, value]) => (
            <SectionForm
              key={key}
              index={key}
              onValuesChange={handleValueChanges}
              onDelete={handleSectionDelete}
            />
          ))}
        </div>
        {/* Action Buttons */}
        <div className="border-t flex justify-end pt-4 gap-4">
          {(existingSections.length > 0 ||
            Object.keys(sections).length > 0) && (
            <Link
              to="examinees"
              className="px-8 py-3 rounded bg-blue-100 text-blue-700"
            >
              Skip
            </Link>
          )}
          <Button onClick={handleSubmission}>Upload Sections & Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default Sections;
