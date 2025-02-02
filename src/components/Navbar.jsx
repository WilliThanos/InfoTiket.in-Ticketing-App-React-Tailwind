import React, { useEffect, useState } from "react";

import PotoProfile from "../assets/profile.png";
import { logout } from "../redux/reducers/authReducer";
import { getProfile } from "../redux/action/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hapus } from "../redux/reducers/historyBookingReducer";
import { hapusProfile } from "../redux/reducers/profileReducer";
import { FaBell } from "react-icons/fa";
import { MdNotificationImportant, MdNotifications } from "react-icons/md";

import { useLocation } from "react-router-dom";
import { getNotification } from "../redux/action/dataAction";
import {
  hapusDataTiket,
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
} from "../redux/reducers/ticketReducer";
import { setStatus } from "../redux/reducers/paymentReducer";

function NavbarLanding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const cekState = useSelector((state) => state);
  console.log("cekState :>> ", cekState);
  const token = useSelector((state) => state?.auth?.token);
  const notification = useSelector((state) => state?.profile?.notif?.data);

  useEffect(() => {
    if (token) {
      dispatch(getNotification());
    }
  }, [token, dispatch]);

  console.log("notification :>> ", notification);

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, []);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
    }
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpen3(false);
    setIsDropdownOpen2(false);
  };

  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen3(false);
  };
  const handleDropdownToggle3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsDropdownOpen2(false);
    setIsDropdownOpen(false);
  };

  const userFirstName = useSelector(
    (state) => state?.profile?.profile?.user?.first_name
  );
  const userProfilePic = useSelector(
    (state) => state?.profile?.profile?.user?.image_url
  );

  const handleLogout = () => {
    setShowConfirmation(true);
    setIsDropdownOpen3(false);
  };

  const confirmLogout = () => {
    dispatch(logout());
    dispatch(hapus());
    dispatch(hapusProfile());
    setShowConfirmation(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  const sortedNotifications = [...(notification || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // const hasNewNotifications = sortedNotifications?.some((notif) => notif.isNew);

  console.log("sortedNotifications:", sortedNotifications);
  console.log("hasNewNotifications:", hasNewNotifications);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-screen-2xl my-4 bg-white rounded-xl shadow-lg max-md:mx-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between max-w-screen-2xl">
          <div className="md:flex md:items-center md:gap-12">
            <a className="flex w-4/6 md:w-4/5 lg:w-full " href="/">
              <span className="sr-only">Home</span>
              <svg
                width="251"
                height="36"
                viewBox="0 0 251 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M117.148 8.12903C115.932 8.12903 114.949 7.73118 114.2 6.93548C113.451 6.12903 113.174 5.17204 113.369 4.06452C113.565 2.93548 114.162 1.97849 115.161 1.19355C116.16 0.397849 117.268 0 118.484 0C119.711 0 120.689 0.397849 121.416 1.19355C122.144 1.97849 122.416 2.93548 122.231 4.06452C122.057 5.17204 121.471 6.12903 120.472 6.93548C119.483 7.73118 118.376 8.12903 117.148 8.12903Z"
                  fill="#2A91E5"
                />
                <path
                  d="M112.262 10.7097H121.254L117.083 35.4839H108.091L112.262 10.7097Z"
                  fill="#2A91E5"
                />
                <path
                  d="M62.325 10.7097L61.2173 17.1613H56.6529L53.561 35.4839H44.569L47.6611 17.1613H44.4713L45.579 10.7097H48.7498L48.8696 10C49.2062 7.95699 49.8524 6.26344 50.808 4.91935C51.7746 3.57527 52.9855 2.56989 54.4407 1.90322C55.9068 1.23656 57.5466 0.903224 59.3602 0.903224C60.5114 0.903224 61.6137 0.989246 62.6671 1.16129C63.7205 1.33333 64.4861 1.48387 64.9639 1.6129L62.6182 8C62.3033 7.90323 61.9395 7.82796 61.5268 7.77419C61.1141 7.70968 60.7394 7.67742 60.4028 7.67742C59.5666 7.67742 58.9693 7.85484 58.6109 8.20968C58.2634 8.56452 58.0353 9.03226 57.9267 9.6129L57.7416 10.7097H62.325Z"
                  fill="#2A91E5"
                />
                <path
                  d="M14.5957 2.45161L9.05716 35.4839H0L5.53855 2.45161H14.5957Z"
                  fill="#2A91E5"
                />
                <path
                  d="M13.6504 35.4839L13.6183 35.4555C17.2968 35.3568 25.1617 33.6479 25.7034 26.5104C24.7163 26.5615 23.3858 26.6625 22.046 26.7642C19.331 26.9702 16.5781 27.1792 16.5696 26.9817C16.5687 26.962 16.5668 26.9405 16.5648 26.9172C16.5281 26.5042 16.4416 25.5296 21.3266 24.1666C25.0291 23.1336 26.5069 22.5175 26.4354 22.1891L27.2209 17.7803C27.5836 16.8747 28.6281 15.1409 29.904 15.4507C31.499 15.8379 31.6182 17.9354 31.6389 18.4175C31.6554 18.7992 31.1493 21.8304 30.9104 23.2619L30.9028 23.3073C32.2088 24.3128 35.2686 26.5948 36.9455 27.6832C39.0416 29.0436 38.9333 30.5257 38.6767 30.5649C38.4714 30.5963 32.988 28.4092 30.2719 27.3117C29.3109 30.3092 29.7024 35.9957 38.8468 34.9802L41.4332 19.6774C41.7482 17.871 41.6613 16.2688 41.1726 14.871C40.6839 13.4731 39.8531 12.3763 38.6803 11.5806C37.5074 10.7849 36.0359 10.3871 34.2657 10.3871C32.4195 10.3871 30.7308 10.8333 29.1996 11.7258C27.6792 12.6075 26.5226 13.8387 25.7298 15.4194H25.4692L26.2511 10.7097H17.7152L13.545 35.4839H13.6504Z"
                  fill="#2A91E5"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M72.8197 35.9355C70.1047 35.9355 67.8676 35.4032 66.1083 34.3387C64.3599 33.2634 63.1327 31.7688 62.4268 29.8548C61.7209 27.9301 61.5797 25.6989 62.0033 23.1613C62.4268 20.6237 63.3119 18.3979 64.6585 16.4839C66.0051 14.5591 67.7373 13.0645 69.855 12C71.9726 10.9247 74.3944 10.3871 77.1202 10.3871C79.8243 10.3871 82.0506 10.9247 83.7991 12C85.5584 13.0645 86.791 14.5591 87.4969 16.4839C88.2136 18.3979 88.3602 20.6237 87.9367 23.1613C87.5132 25.6989 86.6226 27.9301 85.2652 29.8548C83.9077 31.7688 82.1701 33.2634 80.0524 34.3387C77.9456 35.4032 75.5347 35.9355 72.8197 35.9355ZM73.9274 29.3548C74.7093 29.3548 75.4207 29.1021 76.0614 28.5968C76.713 28.0914 77.2668 27.371 77.723 26.4355C78.1899 25.5 78.532 24.3871 78.7492 23.0968C78.9664 21.7957 78.999 20.6828 78.847 19.7581C78.6949 18.8226 78.38 18.1022 77.9021 17.5968C77.4243 17.0914 76.7944 16.8387 76.0125 16.8387C75.2306 16.8387 74.5139 17.0914 73.8623 17.5968C73.2107 18.1022 72.6568 18.8226 72.2007 19.7581C71.7446 20.6828 71.4079 21.7957 71.1907 23.0968C70.9735 24.3871 70.9355 25.5 71.0767 26.4355C71.2287 27.371 71.5437 28.0914 72.0215 28.5968C72.5102 29.1021 73.1455 29.3548 73.9274 29.3548Z"
                  fill="#2A91E5"
                />
                <path
                  d="M108.592 10.7097L107.485 17.1613H103.193L101.457 27.5161C101.403 27.8602 101.414 28.1505 101.49 28.3871C101.566 28.6129 101.718 28.7849 101.946 28.9032C102.185 29.0108 102.5 29.0645 102.891 29.0645C103.151 29.0645 103.472 29.0323 103.852 28.9677C104.232 28.8925 104.52 28.8387 104.715 28.8065L104.976 35.0645C104.52 35.1935 103.906 35.3387 103.135 35.5C102.375 35.672 101.49 35.7849 100.48 35.8387C98.3731 35.9355 96.6572 35.7151 95.3323 35.1774C94.0182 34.6398 93.106 33.8011 92.5956 32.6613C92.096 31.5108 92.0092 30.0753 92.335 28.3548L94.2063 17.1613H90.9992L92.1069 10.7097H95.2848L96.2771 4.77419H105.269L104.274 10.7097H108.592Z"
                  fill="#2A91E5"
                />
                <path
                  d="M131.834 28.4615L130.657 35.4839H121.665L127.203 2.45161H136.195L133.415 19.0323H133.719L141.213 10.7097H151.312L140.996 21.5727L147.403 35.4839H137.108L133.463 26.7761L131.834 28.4615Z"
                  fill="#2A91E5"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M153.731 34.4194C155.491 35.4301 157.706 35.9355 160.378 35.9355C162.702 35.9355 164.781 35.5914 166.617 34.9032C168.463 34.2043 170.016 33.2258 171.276 31.9677C172.546 30.6989 173.475 29.2043 174.061 27.4839H165.851C165.59 27.957 165.243 28.3602 164.809 28.6936C164.385 29.0161 163.896 29.2634 163.342 29.4355C162.799 29.5968 162.224 29.6774 161.616 29.6774C160.725 29.6774 159.998 29.5 159.433 29.1452C158.868 28.7903 158.472 28.3011 158.244 27.6774C158.016 27.0538 157.967 26.3441 158.097 25.5484L158.17 25.1613H174.452L174.778 23.0968C175.104 21.129 175.104 19.3656 174.778 17.8065C174.463 16.2366 173.855 14.8978 172.953 13.7903C172.052 12.6828 170.885 11.8387 169.451 11.2581C168.028 10.6774 166.372 10.3871 164.483 10.3871C161.898 10.3871 159.563 10.9194 157.478 11.9839C155.404 13.0484 153.683 14.5376 152.314 16.4516C150.957 18.3656 150.061 20.6022 149.626 23.1613C149.17 25.828 149.301 28.1183 150.017 30.0323C150.734 31.9355 151.972 33.3979 153.731 34.4194ZM159.102 20.2581H166.959C167.067 19.5484 166.997 18.9247 166.747 18.3871C166.508 17.8387 166.123 17.414 165.59 17.1129C165.069 16.8011 164.439 16.6452 163.701 16.6452C162.962 16.6452 162.267 16.8011 161.616 17.1129C160.975 17.4247 160.427 17.8602 159.97 18.4194C159.551 18.9463 159.261 19.5592 159.102 20.2581Z"
                  fill="#2A91E5"
                />
                <path
                  d="M194.346 17.1613L195.454 10.7097H191.136L192.131 4.77419H183.139L182.146 10.7097H178.968L177.861 17.1613H181.068L179.197 28.3548C178.871 30.0753 178.958 31.5108 179.457 32.6613C179.968 33.8011 180.88 34.6398 182.194 35.1774C183.519 35.7151 185.235 35.9355 187.341 35.8387C188.351 35.7849 189.237 35.672 189.997 35.5C190.768 35.3387 191.381 35.1935 191.837 35.0645L191.577 28.8065C191.381 28.8387 191.094 28.8925 190.713 28.9677C190.333 29.0323 190.013 29.0645 189.752 29.0645C189.361 29.0645 189.046 29.0108 188.808 28.9032C188.579 28.7849 188.427 28.6129 188.351 28.3871C188.275 28.1505 188.265 27.8602 188.319 27.5161L190.054 17.1613H194.346Z"
                  fill="#2A91E5"
                />
                <path
                  d="M196.924 34.6936C197.728 35.5645 198.765 36 200.035 36C200.817 36 201.572 35.8011 202.3 35.4032C203.038 34.9946 203.657 34.4516 204.157 33.7742C204.667 33.086 204.966 32.3226 205.053 31.4839C205.183 30.2581 204.841 29.2097 204.026 28.3387C203.223 27.4677 202.218 27.0323 201.013 27.0323C199.742 27.0323 198.607 27.4677 197.608 28.3387C196.62 29.2097 196.061 30.2581 195.93 31.4839C195.8 32.7419 196.131 33.8118 196.924 34.6936Z"
                  fill="#2A91E5"
                />
                <path
                  d="M222.45 10.7097H213.458L209.288 35.4839H218.28L222.45 10.7097Z"
                  fill="#2A91E5"
                />
                <path
                  d="M218.345 8.12903C217.129 8.12903 216.146 7.73118 215.397 6.93548C214.647 6.12903 214.37 5.17204 214.566 4.06452C214.761 2.93548 215.359 1.97849 216.358 1.19355C217.357 0.397849 218.465 0 219.681 0C220.908 0 221.885 0.397849 222.613 1.19355C223.341 1.97849 223.612 2.93548 223.428 4.06452C223.254 5.17204 222.667 6.12903 221.668 6.93548C220.68 7.73118 219.572 8.12903 218.345 8.12903Z"
                  fill="#2A91E5"
                />
                <path
                  d="M234.264 21.5484L231.919 35.4839H222.927L227.097 10.7097H235.633L234.851 15.4194H235.111C235.904 13.8387 237.061 12.6075 238.581 11.7258C240.112 10.8333 241.801 10.3871 243.647 10.3871C245.417 10.3871 246.889 10.7849 248.062 11.5806C249.235 12.3763 250.065 13.4731 250.554 14.871C251.043 16.2688 251.13 17.871 250.815 19.6774L248.143 35.4839H239.151L241.497 21.5484C241.703 20.3226 241.551 19.3602 241.041 18.6613C240.541 17.9624 239.716 17.6129 238.565 17.6129C237.837 17.6129 237.169 17.7742 236.561 18.0968C235.964 18.4086 235.464 18.8602 235.063 19.4516C234.672 20.0323 234.406 20.7312 234.264 21.5484Z"
                  fill="#2A91E5"
                />
              </svg>
            </a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base text-pretty text-center">
                <li>
                  <a
                    className="text-[#333333]/60 transition hover:text-white font-semibold hover:shadow rounded-xl hover:bg-gray-400 p-3"
                    href="/"
                  >
                    {" "}
                    Beranda{" "}
                  </a>
                </li>

                <li
                  onClick={() => scrollToSection("tujuanterbaik")}
                  className="flex gap-1 cursor-pointer text-[#333333]/60 transition hover:text-white font-semibold hover:shadow rounded-xl hover:bg-gray-400 p-3"
                  href="#"
                >
                  <a> Tujuan</a>
                  <a> Terbaik </a>
                </li>

                <li
                  onClick={() => scrollToSection("mengapakami")}
                  className="flex gap-1 cursor-pointer text-[#333333]/60 transition hover:text-white font-semibold hover:shadow rounded-xl hover:bg-gray-400 p-3"
                  href="#"
                >
                  <a> Mengapa</a>
                  <a> Kami </a>
                </li>
                <li
                  onClick={() => scrollToSection("ourteam")}
                  className="flex gap-1 cursor-pointer text-[#333333]/60 transition hover:text-white font-semibold hover:shadow rounded-xl hover:bg-gray-400 p-3"
                  href="#"
                >
                  <a> Tentang</a>
                  <a> Kami </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <a
                  className=" hidden md:flex px-5 py-2.5 transition text-base font-medium text-[#333333]/60 hover:shadow rounded-xl hover:bg-gray-400"
                  href="/login"
                >
                  Masuk
                </a>

                <div className="hidden md:flex">
                  <a
                    className="rounded-xl bg-[#2A91E5] px-5 py-2.5 transition text-base font-medium text-white hover:bg-sky-700 hover:text-gray-200 hover:shadow"
                    href="/register"
                  >
                    Daftar
                  </a>
                </div>
              </>
            ) : (
              <div className="relative hidden md:flex">
                <div
                  onClick={handleDropdownToggle2}
                  className="flex items-center gap-4 text-[#333333]/60"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userProfilePic === null ? PotoProfile : userProfilePic}
                    alt="Profile"
                  />
                  <div className="text-base font-medium ">
                    Hi, {userFirstName}
                  </div>
                  <span
                    className={`transition ${
                      isDropdownOpen2 ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                  {/* You can add more profile related options here */}
                </div>
                {isDropdownOpen2 && (
                  <div className="absolute mt-11 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <a
                      href="/profile"
                      className="block rounded-md  px-4 py-2 text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] font-semibold"
                    >
                      Profil{" "}
                    </a>
                    <a
                      onClick={handleLogout}
                      href="#"
                      className="block rounded-md  px-4 py-2 text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] font-semibold"
                    >
                      Keluar
                    </a>
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              {token && (
                <div onClick={() => setHasNewNotifications(false)}>
                  {hasNewNotifications ? (
                    <MdNotificationImportant
                      onClick={handleDropdownToggle3}
                      size={22}
                      color="red"
                      className="cursor-pointer"
                    />
                  ) : (
                    <MdNotifications
                      onClick={handleDropdownToggle3}
                      size={22}
                      color="gray"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              )}
              {isDropdownOpen3 && (
                <div className="absolute right-0 ">
                  <div className=" mt-3 w-72  bg-white border text-sm border-gray-200 rounded-md shadow-lg z-10 max-h-28 overflow-y-auto max-sm:w-40">
                    {sortedNotifications?.map((notif) => (
                      <div key={notif.id} className=" ">
                        <div className="block rounded-md border px-4 py-2 text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] ">
                          {notif.message}
                        </div>
                        <div className="block rounded-md border-y- px-4 py-1 text-xs  text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] ">
                          {formatDate(notif.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {showConfirmation && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg font-semibold text-lg">
                  <p className="text-[#333333]">Keluar</p>
                  <p className="font-thin text-sm text-[#333333]">
                    Anda akan dikembalikan ke halaman utama{" "}
                  </p>

                  <div className="flex justify-center mt-4 text-sm  ">
                    <button
                      className="mr-2 px-4 py-2 bg-white text-gray-400 rounded-lg hover:bg-gray-300 "
                      onClick={cancelLogout}
                    >
                      Tidak{" "}
                    </button>
                    <button
                      className=" px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-red-400"
                      onClick={confirmLogout}
                    >
                      Ya{" "}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="block md:hidden">
              <button
                type="button"
                onClick={handleDropdownToggle}
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {!token ? (
                    <>
                      <a
                        href="/login"
                        className="block rounded-md  px-4 py-2 text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] font-semibold"
                      >
                        Masuk
                      </a>
                      <a
                        href="/register"
                        className="block rounded-md  px-4 py-2 text-[#333333]/60 hover:bg-gray-300 hover:text-[#333333] font-semibold"
                      >
                        Daftar
                      </a>
                    </>
                  ) : (
                    <div className="relative md:hidden">
                      <div
                        onClick={handleDropdownToggle2}
                        className="flex items-center gap-4 px-4 py-2"
                      >
                        <img
                          className="w-7 h-7 rounded-full"
                          src={
                            userProfilePic === null
                              ? PotoProfile
                              : userProfilePic
                          }
                          alt="Profile"
                        />
                        <div className="text-base font-medium text-[#333333]">
                          Hi, {userFirstName}
                        </div>
                        <span
                          className={`transition ${
                            isDropdownOpen2 ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                        {/* You can add more profile related options here */}
                      </div>
                      {isDropdownOpen2 && (
                        <>
                          <a
                            href="/profile"
                            className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                          >
                            Profil{" "}
                          </a>
                          <a
                            onClick={handleLogout}
                            href="#"
                            className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                          >
                            Keluar{" "}
                          </a>
                        </>
                      )}
                    </div>
                  )}

                  <a
                    href="#"
                    className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                  >
                    Beranda
                  </a>
                  <a
                    onClick={() => scrollToSection("tujuanterbaik")}
                    href="#"
                    className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                  >
                    Tujuan Terbaik
                  </a>
                  <a
                    href="#"
                    className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                  >
                    Promo
                  </a>
                  <a
                    onClick={() => scrollToSection("mengapakami")}
                    href="#"
                    className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                  >
                    Mengapa Kami
                  </a>
                  <a
                    onClick={() => scrollToSection("ourteam")}
                    href="#"
                    className="block rounded-md  px-4 py-2 text-gray-800/60 hover:bg-gray-300 hover:text-gray-800 font-semibold"
                  >
                    Tentang Kami
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLanding;
