import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarLogoBiru from "../components/Navbar2";
import NavbarLogoPutih from "../components/Navbar";
import CariTiketLain from "../components/CariTiketLain";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import DetailPembayaran from "../components/DetailPembayaran";
import { SlPlane } from "react-icons/sl";
import AirAsiaLogo from "../assets/AirAsia.png";
import { GoTriangleDown } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  setJenisKelamin,
  setNamaDepan,
  setNamaBelakang,
  setTanggalLahir,
  setEmail,
  setNomorHP,
} from "../redux/reducers/bookingReducer";

export default function BookingDetail() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const jenisKelamin = useSelector((state) => state?.booking?.jenisKelamin);
  const tanggalLahir = useSelector((state) => state?.booking?.tanggalLahir);
  const namaDepan = useSelector((state) => state?.booking?.namaDepan);
  const namaBelakang = useSelector((state) => state?.booking?.namaBelakang);
  const email = useSelector((state) => state?.booking?.email);
  const nomorHP = useSelector((state) => state?.booking?.nomorHP);

  const dispatch = useDispatch();

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(tanggalLahir));

  const departureDateRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNamaDepan(namaDepan));
    dispatch(setNamaBelakang(namaBelakang));
    dispatch(setNomorHP(nomorHP));
    dispatch(setEmail(email));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-2xl mx-auto  ">
      <NavbarLogoBiru />
      {/* <div className="mt-24">
        <NavbarLogoPutih />
      </div> */}

      <div className="mt-24">
        <CariTiketLain />
      </div>
      <div className="flex pt-32 gap-8max-md:mx-2 max-md:gap-3  max-lg:pt-40  max-xl:pt-40 max-xl:flex-col max-xl:mx-2 ">
        <div className="flex flex-col gap-7">
          <div className="w-full">
            <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Pemesanan Tiket
            </div>
            <div className=" mx-auto bg-gray-200 rounded-xl shadow-sm px-6 max-sm:px-4 ">
              <div className="py-10 flex flex-col gap-10">
                <div>
                  <div className="flex items-center gap-4">
                    <GiAirplaneDeparture size={20} />
                    <div className="font-bold text-base max-sm:text-sm">
                      Pesawat Keberangkatan
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pt-4 max-lg:gap-4 ">
                    <div>
                      <div className="font-bold text-[22px] max-lg:text-lg max-sm:text-sm">
                        {formattedDate}
                      </div>
                      <div className="font-semibold text-base max-lg:text-sm max-sm:text-xs">
                        Ekonomi
                      </div>
                    </div>
                    <div className="flex gap-4 max-sm:flex-col max-sm:gap-2">
                      <div className="flex items-center justify-center ">
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm ">
                            Jakarta{" "}
                          </div>
                          <div className=" text-base max-lg:text-sm">(CGK)</div>
                        </div>
                        <div className="flex items-center ">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                          <div className="">
                            <SlPlane
                              className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                              size={22}
                            />
                          </div>
                          <div className="border-solid border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm">
                            Medan
                          </div>
                          <div className="flex justify-between w-full">
                            <div className="text-base"></div>{" "}
                            <div className="text-base max-lg:text-sm">
                              (KNO)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <img
                          src={AirAsiaLogo}
                          alt="AirAsia Logo"
                          className="h-7 w-auto rounded"
                        />

                        <div className="font-medium text-base max-lg:text-sm">
                          AirAsia
                        </div>
                      </div>

                      <div className="flex items-center justify-center max-sm:justify-start ">
                        <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                          19:00
                        </div>
                        <div className="flex items-center">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[40px] mx-2 max-lg:w-[20px] "></div>
                          <div className="font-bold text-base max-lg:text-sm ">
                            4j 0m
                          </div>
                          <div className="border-solid border-b border-black w-[40px] mx-2 max-lg:w-[20px] "></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                            23:00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <GiAirplaneDeparture size={20} />
                    <div className="font-bold text-base max-sm:text-sm">
                      Pesawat Keberangkatan
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pt-4 max-lg:gap-4 ">
                    <div>
                      <div className="font-bold text-[22px] max-lg:text-lg max-sm:text-sm">
                        {formattedDate}
                      </div>
                      <div className="font-semibold text-base max-lg:text-sm max-sm:text-xs">
                        Ekonomi
                      </div>
                    </div>
                    <div className="flex gap-4 max-sm:flex-col max-sm:gap-2">
                      <div className="flex items-center justify-center ">
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm ">
                            Jakarta{" "}
                          </div>
                          <div className=" text-base max-lg:text-sm">(CGK)</div>
                        </div>
                        <div className="flex items-center ">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                          <div className="">
                            <SlPlane
                              className="tilted-icon max-lg:size-[18px] max-sm:size-[20px]"
                              size={22}
                            />
                          </div>
                          <div className="border-solid border-b-2 border-gray-400 w-[60px] mx-2 max-lg:w-[30px] max-sm:w-[20px]"></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-base max-lg:text-sm">
                            Medan
                          </div>
                          <div className="flex justify-between w-full">
                            <div className="text-base"></div>{" "}
                            <div className="text-base max-lg:text-sm">
                              (KNO)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <img
                          src={AirAsiaLogo}
                          alt="AirAsia Logo"
                          className="h-7 w-auto rounded"
                        />

                        <div className="font-medium text-base max-lg:text-sm">
                          AirAsia
                        </div>
                      </div>

                      <div className="flex items-center justify-center max-sm:justify-start ">
                        <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                          19:00
                        </div>
                        <div className="flex items-center">
                          <div className="border-dashed	border-b-2 border-gray-400 w-[40px] mx-2 max-lg:w-[20px] "></div>
                          <div className="font-bold text-base max-lg:text-sm ">
                            4j 0m
                          </div>
                          <div className="border-solid border-b border-black w-[40px] mx-2 max-lg:w-[20px] "></div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col font-semibold text-lg max-lg:text-sm ">
                            23:00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="pb-4 font-bold text-2xl max-lg:text-xl max-sm:text-lg">
              Detail Penumpang
            </div>
            <div className=" mx-auto bg-white rounded-xl shadow-sm px-6 max-sm:px-4 ">
              <div className="w-3/4 pt-10 max-lg:w-full ">
                <div className="font-semibold text-lg max-md:text-base">
                  Informasi Penumpang
                </div>
                <div className="flex items-center gap-4 pt-4 max-sm:flex-col">
                  <div
                    onClick={handleDropdownToggle}
                    className="flex flex-col gap-2 w-full "
                  >
                    <div className=" text-xs">Jenis Kelamin</div>
                    <div className="flex  justify-between items-center gap-2 px-4 rounded border-2  border-gray-300  h-14 w-auto max-md:h-12">
                      <div className="font-medium text-sm  ">
                        {jenisKelamin}
                      </div>
                      <GoTriangleDown
                        className={`transition ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute mt-44  w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setJenisKelamin("Pria"));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Pria</div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="block rounded-md px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800"
                        onClick={() => {
                          dispatch(setJenisKelamin("Wanita"));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <div className="font-">Wanita</div>
                        </div>
                      </a>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-xs">Nama Depan</div>
                    <input
                      type="text"
                      required
                      value={namaDepan}
                      onChange={(e) => dispatch(setNamaDepan(e.target.value))}
                      className="flex  font-medium text-sm items-center  px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10 "
                      placeholder="Nama Depan"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">Nama Belakang</div>
                    <input
                      type="text"
                      required
                      value={namaBelakang}
                      onChange={(e) =>
                        dispatch(setNamaBelakang(e.target.value))
                      }
                      className="flex  font-medium text-sm items-center  px-2 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full max-md:h-10 "
                      placeholder="Nama Belakang"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">Tanggal Lahir</div>
                    <div className="flex  justify-between items-center gap-2 px-2 rounded border-2 border-gray-300 focus:border-sk h-14 w-auto max-md:h-12 ">
                      <div>
                        <DatePicker
                          selected={tanggalLahir}
                          onChange={(date) => {
                            dispatch(setTanggalLahir(date));
                            console.log("date :>> ", typeof date);
                          }}
                          dateFormat="EEE, d MMM yyyy"
                          locale={id}
                          placeholderText="dd/mm/yyyy"
                          className="cursor-pointer  font-medium text-sm w-full"
                          ref={departureDateRef}
                        />
                      </div>
                      <SlCalender
                        className="cursor-pointer"
                        onClick={() => departureDateRef.current.setFocus()}
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/4 pt-6 pb-10 max-lg:w-full">
                <div className="font-semibold text-lg max-md:text-base">
                  Detail Kontak
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">Email</div>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                      className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full pr-10 max-md:h-10"
                      placeholder="abc@gmail.com"
                    />{" "}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" text-xs">No. Handphone</div>
                    <input
                      type="text"
                      required
                      value={nomorHP}
                      onChange={(e) => dispatch(setNomorHP(e.target.value))}
                      className="flex justify-between text-sm items-center gap-2 px-4 rounded border-2 border-gray-300 focus:border-sky-500 focus:outline-none h-12 w-full pr-10 max-md:h-10"
                      placeholder="+62 8123456789"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Detail Pembayaran Component */}
          <DetailPembayaran />
          {/* Detail Pembayaran Component */}
          <button className="rounded-xl bg-[#2A91E5] px-5 mt-8 py-2.5 w-full font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow">
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}
