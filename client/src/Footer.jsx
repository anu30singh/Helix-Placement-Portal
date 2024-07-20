import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="px-4 pb-3 border-t border-white/40 text-white bg-[#17181E] pt-14">
            <div className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
                {/* LEFT START */}
                <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
                    {/* MENU START */}
                    <div className="flex flex-col gap-3 shrink-0">
                        <div className="text-sm font-medium uppercase cursor-pointer font-oswald">
                            Find a Job
                        </div>
                        <div className="text-sm font-medium uppercase cursor-pointer font-oswald">
                            Become a Partner
                        </div>
                        <div className="text-sm font-medium uppercase cursor-pointer font-oswald">
                            Sign Up for Updates
                        </div>
                        <div className="text-sm font-medium uppercase cursor-pointer font-oswald">
                            Send Us Feedback
                        </div>
                        <div className="text-sm font-medium uppercase cursor-pointer font-oswald">
                            Student Resources
                        </div>
                    </div>
                    {/* MENU END */}

                    {/* NORMAL MENU START */}
                    <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                            <div className="text-sm font-medium uppercase font-oswald">
                                Get Help
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                FAQ
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Support
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Contact Us
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Accessibility
                            </div>
                        </div>
                        {/* MENU END */}

                        {/* MENU START */}
                        <div className="flex flex-col gap-3">
                            <div className="text-sm font-medium uppercase font-oswald">
                                About Us
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Our Story
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Careers
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                News
                            </div>
                            <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                                Privacy Policy
                            </div>
                        </div>
                        {/* MENU END */}
                    </div>
                    {/* NORMAL MENU END */}
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex justify-center gap-4 md:justify-start">
                    <div
                        onClick={() =>
                            window.open("https://facebook.com", "_blank")
                        }
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                        <FaFacebookF size={20} />
                    </div>
                    <Link
                        to="https://twitter.com"
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                        <FaTwitter size={20} />
                    </Link>
                    <div
                        onClick={() =>
                            window.open("https://youtube.com", "_blank")
                        }
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white hover:text-red-600 transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                        <FaYoutube size={20} />
                    </div>
                    <div
                        onClick={() =>
                            window.open("https://instagram.com", "_blank")
                        }
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-custom-gradient hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                        <FaInstagram size={20} />
                    </div>
                    <div
                        onClick={() =>
                            window.open("https://linkedin.com", "_blank")
                        }
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-blue-700 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                        <FaLinkedin size={20} />
                    </div>
                </div>
                {/* RIGHT END */}
            </div>
            <div className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
                {/* LEFT START */}
                <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
                    © 2023 Placement Inc. All Rights Reserved
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Guides
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Terms of Service
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Privacy Policy
                    </div>
                    <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
                        Cookie Policy
                    </div>
                </div>
                {/* RIGHT END */}
            </div>
        </footer>
    );
};

export default Footer;
