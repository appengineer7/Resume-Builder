// Privacy.jsx
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate, Link } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const sections = [
    {
      title: "Information We Collect",
      content: "We collect personal information such as your name, email, and resume data to provide our services. This includes data you provide during signup, login, and resume building.",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "How We Use Your Data",
      content: "Your data is used to generate resumes, provide AI suggestions, and improve our platform. We do not sell your personal information to third parties.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your data, including encryption and secure servers. However, no system is completely secure.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal data. Contact us at privacy@resumebuilder.com to exercise these rights.",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies to enhance user experience and analyze usage. You can manage cookie preferences through your browser settings.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Changes to This Policy",
      content: "We may update this privacy policy periodically. Changes will be posted here, and significant updates will be notified via email.",
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Privacy{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Policy
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Your privacy matters. Last updated: October 17, 2025.
            <span className="font-semibold text-purple-600">We are committed to protecting your data.</span>
          </motion.p>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="relative py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className={`border-0 bg-gradient-to-r ${section.color}/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-white/20`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-3 transition-opacity duration-500`}></div>
                  <CardHeader className="relative z-10 pt-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 p-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="py-12 bg-gradient-to-r from-slate-900 to-purple-900 text-white relative overflow-hidden">
                {/* Background overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

                        {/* Logo + Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center md:items-start"
                        >
                            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
                                ResumeBuilder
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                                Built by{" "}
                                <a
                                    href="https://nexelix.tech/"
                                    className="font-semibold text-purple-400 hover:underline"
                                >
                                    Nexelix Tech
                                </a>{" "}
                                for job seekers everywhere. Helping you land your dream career.
                            </p>
                        </motion.div>

                        {/* Footer Link Sections */}
                        {[
                            { title: "Product", links: ["Templates", "Builder"] },
                            { title: "Company", links: ["About", "Contact"] },
                            { title: "Support", links: ["Privacy"] },
                        ].map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center md:items-start"
                            >
                                <h4 className="font-bold text-gray-200 mb-3">{section.title}</h4>
                                <div className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <motion.div key={linkIndex} whileHover={{ x: 2 }}>
                                            {section.title === "Product" ? (
                                                <button
                                                    onClick={() =>
                                                        link === "Templates"
                                                            ? navigate("/builder", { state: { step: 6 } })
                                                            : navigate(`/${link.toLowerCase()}`)
                                                    }
                                                    className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                                                >
                                                    {link}
                                                </button>
                                            ) : (
                                                <Link
                                                    to={`/${link.toLowerCase()}`}
                                                    className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                                                >
                                                    {link}
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-white/10 mt-12 pt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Resume Builder. All rights reserved.
                            <span className="ml-2 text-purple-400">
                                Made by{" "}
                                <a
                                    href="https://nexelix.tech/"
                                    className="hover:underline font-semibold text-purple-500"
                                >
                                    Nexelix Tech
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
    </div>
  );
};

export default Privacy;