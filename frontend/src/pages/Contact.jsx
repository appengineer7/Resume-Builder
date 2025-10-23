// Contact.jsx (updated form section only)
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Instagram, Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Submitting contact form:", formData);
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus(data.message || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again later.");
      console.error("Error submitting contact form:", error);
    }
    setIsSubmitting(false);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            Get In{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Touch
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Have questions? Ideas? We'd love to hear from you. Reach out and let's chat.
          </motion.p>

        </div>
      </section>

      {/* Contact Form Section */}
      <section id="form" className="relative py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Fill out the form below, and we'll respond within 24 hours.
            </p>
          </motion.div>
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg border border-white/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-center">
                    {submitStatus}
                  </div>
                )}
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-vertical"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Other Ways to Reach Us</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We're always here to help. Choose your preferred method.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4 mt-2"><Mail className="w-10 h-10 text-blue-500" /></div>
                <CardTitle className="text-xl mb-2">Email</CardTitle>
                <p className="text-white/70 mb-4">resumebuilder@nexelix.tech</p>
                <Button
                  variant="outline"
                  className="w-full border-white/20"
                  onClick={() => window.location.href = "mailto:resumebuilder@nexelix.tech"}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4 mt-2"> <Instagram className="w-10 h-10 text-pink-500" /></div>
                <CardTitle className="text-xl mb-2">Instagram</CardTitle>
                <p className="text-white/70 mb-4">@nexelixtech</p>
                <Button variant="outline" className="w-full border-white/20"> <a href="https://www.instagram.com/nexelixtech?utm_source=ig_web_button_share_sheet&igsh=azRrdXNicWh1ZzV0">Follow on Instagram</a></Button>
              </CardContent>

            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4 mt-2"> <Linkedin className="w-10 h-10 text-blue-400" /></div>
                <CardTitle className="text-xl mb-2">LinkedIn</CardTitle>
                <p className="text-white/70 mb-4">ResumeBuilder Inc.</p>
                <Button variant="outline" className="w-full border-white/20"><a href="https://www.linkedin.com/company/nexelix">Connect</a></Button>
              </CardContent>
            </Card>
          </div>
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

export default Contact;