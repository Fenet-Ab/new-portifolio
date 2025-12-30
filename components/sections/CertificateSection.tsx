
import React from 'react';
import { certificates } from '../../data/certificates';
import { ExternalLink, Award, FileText } from 'lucide-react';
import { FaGoogleDrive } from "react-icons/fa";
import Image from 'next/image';

const CertificateSection = () => {
    return (
        <section id="certificates" className="py-20 relative overflow-hidden bg-background/50">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">

                    <h2 className="text-3xl md:text-4xl font-bold mb-12 relative text-center">
                        Certifications
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Professional milestones and achievements.
                    </p>
                </div>
                {/* ... rest of component ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
                        >
                            {/* Image/Preview Section */}
                            <div className="relative h-48 w-full bg-muted/50 overflow-hidden border-b border-border/50">
                                {cert.type === 'image' ? (
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={cert.link}
                                            alt={cert.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-4 group-hover:bg-primary/5 transition-colors">
                                        <FileText className="w-16 h-16 text-muted-foreground/50 mb-2 group-hover:text-primary transition-colors" />
                                        <span className="text-sm text-muted-foreground">PDF Certificate</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {cert.driveLink && (
                                        <a
                                            href={cert.driveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm text-white transition-colors"
                                            title="View on Drive"
                                        >
                                            <FaGoogleDrive className="w-6 h-6" />
                                        </a>
                                    )}
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm text-white transition-colors"
                                        title="View File"
                                    >
                                        <ExternalLink className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4 flex justify-between items-start">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Award className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                                        {cert.year}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {cert.issuer}
                                </p>

                                {/* Footer Links (Mobile accessible) */}
                                <div className="mt-auto pt-4 border-t border-border/50 flex gap-4 md:hidden">
                                    {cert.driveLink && (
                                        <a href={cert.driveLink} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary">
                                            <FaGoogleDrive className="w-3 h-3" /> Drive
                                        </a>
                                    )}
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary">
                                        <ExternalLink className="w-3 h-3" /> View
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;