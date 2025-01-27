"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// * Third Party
import { Table } from "flowbite-react";
import { MdEditSquare } from "react-icons/md";
import SignaturePad from "react-signature-canvas";
import toast from "react-hot-toast";

// * Custom Components
import AideNoteSection from "../AideNote/AideNoteSection";
import MyModal from "@/components/Commons/Modal";
import PatientInformation from "./PatientInformation";

// * Helpers
import { dataURLtoBlob, formatDateAndTime } from "@/helpers/utils";
import { BlobType, DashboardTableType } from "@/types";

// * CSS
import "reactjs-popup/dist/index.css";

import "./style.css";

function DashboardTable({ columns, rows }: DashboardTableType) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [childModal, setChildModal] = useState<boolean>(false);
  const [patientImageURL, setPatientImageURL] = useState<string | null>(null);
  const [careGiverImageURL, setCareGiverImageURL] = useState<string | null>(null);
  const [showPatientsign, setShowPatientsign] = useState<boolean>(false);
  const [showCareGiverSign, setShowCareGiverSign] = useState<boolean>(false);
  const [currOpenModalIndex, setCurrOpenModalIndex] = useState<number>(0);
  const [blobObj, setBlobObj] = useState<BlobType>();
  const [patientSignDate, setPatientSignDate] = useState<string>("");
  const [careGiverSignDate, setCareGiverSignDate] = useState<string>("");
  const [patientModal, setPatientModal] = useState<boolean>(false);

  const sigCanvas = useRef<any>();
  const careGiverCanvas = useRef<any>();

  const clearPatientSign = () => sigCanvas.current.clear();
  const clearCGsign = () => careGiverCanvas.current.clear();

  const savePatientSign = () => {
    if (!sigCanvas.current.isEmpty()) {
      setPatientImageURL(sigCanvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      // save into object
      setBlobObj((prev) => ({
        ...prev,
        ...{
          [currOpenModalIndex]: {
            patient: dataURLtoBlob(sigCanvas.current.toDataURL("image/png")),
          },
        },
      }));
      setShowPatientsign(false);
      setPatientSignDate(formatDateAndTime(new Date()));
    } else {
      toast.error("Can not save empty signature");
    }
  };
  const saveCGsign = () => {
    if (!careGiverCanvas.current.isEmpty()) {
      setCareGiverImageURL(careGiverCanvas.current.toDataURL("image/png"));

      setBlobObj((prev) => {
        if (prev) {
          return {
            ...prev,
            ...{
              [currOpenModalIndex]: {
                patient: prev[currOpenModalIndex].patient,
                careGiver: dataURLtoBlob(careGiverCanvas.current.toDataURL("image/png")),
              },
            },
          };
        }
      });
      setShowCareGiverSign(false);
      setCareGiverSignDate(formatDateAndTime(new Date()));
    } else {
      toast.error("Can not save empty signature");
    }
  };

  const dashboardModalBody = () => {
    const submodalBody = () => {
      const childCloseHandler = () => {
        setChildModal(false);
      };
      return (
        <>
          <AideNoteSection childCloseHandler={childCloseHandler} />
        </>
      );
    };

    const handleCloseComment = () => {
      setOpenModal(false);
      setPatientSignDate("");
      setCareGiverSignDate("");
    };

    return (
      <>
        <div>
          <button type="button" className="w-full capitalize text-white py-4 text-xl bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            start visit
          </button>
        </div>
        <div className="mt-6">
          <h5 className="bg-sky-700 text-white p-2 capitalize mb-3">patient signature</h5>
          <button
            type="button"
            className={`focus:outline-none text-white bg-lime-600	 hover:bg-lime-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-lime-600	 dark:focus:ring-green-800 capitalize ${showPatientsign ? "hidden" : ""}`}
            onClick={() => {
              setShowPatientsign(true);
            }}
          >
            {`${patientSignDate ? "Update" : "Add"}`} signature
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="patient_signedDate">Singed Date</label>
            <input type="text" id="patient_signedDate" disabled value={patientSignDate} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded hover:cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5" />
          </div>

          {showPatientsign && (
            <>
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
              <button onClick={savePatientSign} className="text-white mt-1 capitalize bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">
                Save
              </button>
              <button onClick={clearPatientSign} className="text-white mt-1 capitalize bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">
                Clear
              </button>
              <button
                className="text-white mt-1 capitalize bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max"
                onClick={() => {
                  setShowPatientsign(false);
                }}
              >
                Close
              </button>
            </>
          )}

          {patientImageURL && !showPatientsign ? (
            <Image
              src={patientImageURL}
              width={100}
              height={100}
              alt="my signature"
              style={{
                display: "block",
                margin: "0 auto",
                border: "1px solid black",
                marginTop: "10px",
                width: "100%",
                height: "500px",
              }}
            />
          ) : null}
        </div>
        <div className="mt-6">
          <h5 className="bg-sky-700 text-white p-2 capitalize mb-3">Caregiver signature</h5>
          <button
            type="button"
            className={`focus:outline-none text-white bg-lime-600	 hover:bg-lime-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-lime-600	 dark:focus:ring-green-800 capitalize ${showCareGiverSign ? "hidden" : ""}`}
            onClick={() => {
              setShowCareGiverSign(true);
            }}
          >
            {`${careGiverSignDate ? "Update" : "Add"}`} signature
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="patient_signedDate">Singed Date</label>
            <input type="text" id="patient_signedDate" disabled value={careGiverSignDate} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded hover:cursor-not-allowed focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5" />
          </div>

          {showCareGiverSign && (
            <>
              <SignaturePad
                ref={careGiverCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
              <button onClick={saveCGsign} className="text-white mt-1 capitalize bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">
                Save
              </button>
              <button onClick={clearCGsign} className="text-white mt-1 capitalize bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">
                Clear
              </button>
              <button
                className="text-white mt-1 capitalize bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 px-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max"
                onClick={() => {
                  setShowCareGiverSign(false);
                }}
              >
                Close
              </button>
            </>
          )}

          {careGiverImageURL && !showCareGiverSign ? (
            <Image
              src={careGiverImageURL}
              alt="my signature"
              width={100}
              height={100}
              style={{
                display: "block",
                margin: "0 auto",
                border: "1px solid black",
                width: "100%",
                marginTop: "10px",
                height: "500px",
              }}
            />
          ) : null}
        </div>
        <div className="mt-6">
          <h5 className="bg-sky-700 text-white p-2 capitalize mb-3">Comments</h5>
          <textarea name="comments" className="w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm"></textarea>
        </div>
        <div className="mt-6">
          <h5 className="bg-sky-700 text-white p-2 capitalize mb-3">mileage</h5>
          <div className=" flex items-center gap-2">
            <label htmlFor="mile">Mile</label>
            <input type="text" id="mile" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5" />
          </div>
          <label htmlFor="mileComment" className="inline-block mt-3">
            Milage Comment
          </label>
          <textarea id="mileComment" className="block w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm"></textarea>
        </div>
        <div className="mt-6">
          <button className="w-full bg-violet-500 hover:bg-violet-400 text-white p-2 rounded-lg" onClick={() => setChildModal(true)}>
            Add Aide Note
          </button>

          <MyModal modalTitle="Add Aide Note" modalBody={submodalBody()} setOpenModal={setChildModal} openModal={childModal} />
        </div>
        <div className="mt-6 flex flex-col">
          <button className="text-white capitalize bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">save & close</button>
          <button onClick={handleCloseComment} className="text-white capitalize bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block w-max">
            close
          </button>
        </div>
        <div className="mt-6">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="text-white capitalize bg-green-400 w-full hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            end visit
          </button>
        </div>
      </>
    );
  };

  const patientModalBody = () => {
    return (
      <>
        <PatientInformation handleClose={() => setPatientModal(false)} />
      </>
    );
  };

  const handleClick = (index: number) => {
    setOpenModal(true);
    setShowPatientsign(false);
    setShowCareGiverSign(false);
    setCareGiverImageURL(null);
    setPatientImageURL(null);
    setCurrOpenModalIndex(index);
  };

  const handlePatientModal = () => {
    setPatientModal(true);
  };

  return (
    <div className="overflow-x-auto flex-1 table-wrapper">
      <Table className="cg-table">
        <Table.Head>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Client</Table.HeadCell>
          {columns.map((currCol, index) => {
            return <Table.HeadCell key={index}>{currCol.label}</Table.HeadCell>;
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {rows.map((currRow, index: number) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <MdEditSquare
                      size={30}
                      style={{ color: "green" }}
                      onClick={() => {
                        handleClick(index);
                      }}
                    />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <span className="uppercase font-medium hover:cursor-pointer text-cyan-600 dark:text-cyan-500uppercase border-b border-cyan-600" onClick={handlePatientModal}>
                    {currRow["client_name"]}
                  </span>
                </Table.Cell>
                {columns.map((currCol, index) => {
                  return (
                    <Table.Cell key={index} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <span>{currRow[currCol.value]}</span>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <MyModal
        modalBody={dashboardModalBody()}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onClose={() => {
          setOpenModal(false);
          setPatientSignDate("");
          setCareGiverSignDate("");
        }}
      />

      <MyModal modalTitle="Patient Information" openModal={patientModal} setOpenModal={setPatientModal} modalBody={patientModalBody()} />
    </div>
  );
}

export default DashboardTable;
