
import React, { useState } from 'react';

const PublicityClearenceForm = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, form, status
  const [submissionStatus, setSubmissionStatus] = useState('PENDING');
  const [referenceId, setReferenceId] = useState('');
  
  // Sample film data
  const filmNeedingClearance = {
    title: "The Great Adventure",
    language: "Kannada",
    producer: "ABC Productions",
    referenceId: "KFC-2401",
    publicityItems: 15,
    censorRating: "U/A",
    submittedDate: "January 7, 2024"
  };

  const [formData, setFormData] = useState({
    applicantName: '',
    firmName: '',
    address: '',
    representativeName: '',
    filmTitle: '',
    language: '',
    censorCertNumber: '',
    censorCertDate: '',
    censorRating: 'U',
    hoardings: 0,
    posters: 0,
    photocards: 0,
    slides: 0,
    blockDesigns: 0,
    artPulls: 0,
    stickers: 0,
    newspaperDesigns: 0,
    others: 0,
    agreedToTerms: false
  });

  const handleFilmClick = () => {
    setFormData(prev => ({
      ...prev,
      filmTitle: filmNeedingClearance.title,
      language: filmNeedingClearance.language,
      censorRating: filmNeedingClearance.censorRating
    }));
    setCurrentView('form');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return parseInt(formData.hoardings || 0) + 
           parseInt(formData.posters || 0) + 
           parseInt(formData.photocards || 0) + 
           parseInt(formData.slides || 0) + 
           parseInt(formData.blockDesigns || 0) + 
           parseInt(formData.artPulls || 0) + 
           parseInt(formData.stickers || 0) + 
           parseInt(formData.newspaperDesigns || 0) + 
           parseInt(formData.others || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = formData.firmName.toLowerCase().includes('reject') ? 'REJECTED' : 'PENDING';
    setSubmissionStatus(status);
    setReferenceId(`KFC-${Math.floor(1000 + Math.random() * 9000)}`);
    setCurrentView('status');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setFormData({
      applicantName: '',
      firmName: '',
      address: '',
      representativeName: '',
      filmTitle: '',
      language: '',
      censorCertNumber: '',
      censorCertDate: '',
      censorRating: 'U',
      hoardings: 0,
      posters: 0,
      photocards: 0,
      slides: 0,
      blockDesigns: 0,
      artPulls: 0,
      stickers: 0,
      newspaperDesigns: 0,
      others: 0,
      agreedToTerms: false
    });
  };

  // DASHBOARD VIEW
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navbar */}
        {/* <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-indigo-700">KFCC Clearance Portal</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">Film Publicity Clearance Committee</span>
              </div>
            </div>
          </div>
        </nav> */}

        <main className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Film Publicity Clearance
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Karnataka Film Chamber of Commerce
              </p>
             
            </div>

            {/* Film Card - Clickable */}
            <div 
              onClick={handleFilmClick}
              className="block cursor-pointer"
            >
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border-2 border-gray-200 hover:border-indigo-500  mx-auto transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Film Pending Clearance</h3>
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{filmNeedingClearance.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                          {filmNeedingClearance.language}
                        </span>
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {filmNeedingClearance.submittedDate}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                        Needs Clearance
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Producer</p>
                        <p className="font-medium text-gray-900">{filmNeedingClearance.producer}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Reference ID</p>
                        <p className="font-mono font-medium text-gray-900">{filmNeedingClearance.referenceId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Publicity Items</p>
                        <p className="font-medium text-gray-900">{filmNeedingClearance.publicityItems} items</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Censor Rating</p>
                        <p className="font-medium text-gray-900">{filmNeedingClearance.censorRating}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center text-indigo-600 font-medium">
                      <span>Click to apply for public clearance</span>
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Submit your film publicity materials for clearance approval
              </p>
            </div>

          </div>
        </main>
      </div>
    );
  }

  // FORM VIEW
  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-indigo-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center uppercase tracking-wide">
              Film Publicity Clearance Committee
            </h1>
            <p className="text-indigo-100 text-center text-sm">
              Karnataka Film Chamber of Commerce
            </p>
            <p className="text-indigo-200 text-center text-xs mt-1">
              28, 1st Main, Crescent Road, High Grounds, Bangalore - 560 001
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            
            {/* Section 1: Applicant Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Applicant Details</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">Name (Proprietor/Partner/Director)</label>
                  <div className="mt-1">
                    <input type="text" name="applicantName" id="applicantName" required value={formData.applicantName} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="Sri/Smt." />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="firmName" className="block text-sm font-medium text-gray-700">Firm / Concern Name</label>
                  <div className="mt-1">
                    <input type="text" name="firmName" id="firmName" required value={formData.firmName} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="M/s..." />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1">
                    <textarea id="address" name="address" rows="3" required value={formData.address} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2" />
                  </div>
                </div>
                
                <div className="sm:col-span-1">
                  <label htmlFor="representativeName" className="block text-sm font-medium text-gray-700">Representative Name (if any)</label>
                  <div className="mt-1">
                    <input type="text" name="representativeName" id="representativeName" value={formData.representativeName} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Film Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Film Details</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                
                <div className="sm:col-span-3">
                  <label htmlFor="filmTitle" className="block text-sm font-medium text-gray-700">Film Title</label>
                  <div className="mt-1">
                    <input type="text" name="filmTitle" id="filmTitle" required value={formData.filmTitle} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                  <div className="mt-1">
                    <select id="language" name="language" required value={formData.language} onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border">
                      <option value="">Select Language</option>
                      <option value="Kannada">Kannada</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6 mt-2">
                   <p className="text-sm font-medium text-gray-700 mb-2">Censor Certificate Details (If Certified)</p>
                   <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <div className="col-span-1">
                        <label htmlFor="censorCertNumber" className="block text-xs font-medium text-gray-500">Number</label>
                        <input type="text" name="censorCertNumber" id="censorCertNumber" value={formData.censorCertNumber} onChange={handleChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 border" />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="censorCertDate" className="block text-xs font-medium text-gray-500">Date</label>
                        <input type="date" name="censorCertDate" id="censorCertDate" value={formData.censorCertDate} onChange={handleChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 border" />
                      </div>
                       <div className="col-span-1">
                        <label htmlFor="censorRating" className="block text-xs font-medium text-gray-500">Rating</label>
                        <select id="censorRating" name="censorRating" value={formData.censorRating} onChange={handleChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 border">
                          <option value="U">U</option>
                          <option value="U/A">U/A</option>
                          <option value="A">A</option>
                          <option value="S">S</option>
                        </select>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Section 3: Publicity Materials */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Publicity Materials (No. of Copies)</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-4">
                
                {[
                  { label: 'Hoardings', name: 'hoardings' },
                  { label: 'Poster Designs', name: 'posters' },
                  { label: 'Photocards', name: 'photocards' },
                  { label: 'Slides', name: 'slides' },
                  { label: 'Block Designs', name: 'blockDesigns' },
                  { label: 'Art Pulls', name: 'artPulls' },
                  { label: 'Stickers', name: 'stickers' },
                  { label: 'Newspaper Designs', name: 'newspaperDesigns' },
                  { label: 'Others', name: 'others' },
                ].map((item) => (
                  <div key={item.name} className="col-span-1">
                     <label htmlFor={item.name} className="block text-sm font-medium text-gray-700">{item.label}</label>
                     <input type="number" min="0" name={item.name} id={item.name} value={formData[item.name]} onChange={handleChange}
                        className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                  </div>
                ))}
                
                <div className="col-span-1 sm:col-start-4 bg-indigo-50 p-2 rounded-md border border-indigo-100 flex flex-col justify-center items-center">
                   <span className="text-sm font-bold text-indigo-700">Total Count</span>
                   <span className="text-xl font-bold text-indigo-900">{calculateTotal()}</span>
                </div>
                
              </div>
            </div>

            {/* Section 4: Declaration */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="agreedToTerms" name="agreedToTerms" type="checkbox" required checked={formData.agreedToTerms} onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreedToTerms" className="font-medium text-gray-700">Declaration</label>
                  <p className="text-gray-500">I hereby declare that I am the producer/distributor/authorized representative of the film. I agree to abide scrupulously by any decision taken by the Film Publicity Clearance Committee regarding the publicity material submitted herewith.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleBackToDashboard}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Application
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }

  // STATUS VIEW
  if (currentView === 'status') {
    const isRejected = submissionStatus === 'REJECTED';

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          {isRejected ? (
             <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
               <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isRejected ? 'Application Rejected' : 'Approve Pending'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isRejected 
              ? 'Your application has been returned. Please check the remarks and resubmit.' 
              : 'Your application has been submitted successfully and is currently under review by the committee.'}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-500">Reference ID</p>
            <p className="font-mono text-lg font-medium text-gray-900">{referenceId}</p>
          </div>

          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PublicityClearenceForm;
