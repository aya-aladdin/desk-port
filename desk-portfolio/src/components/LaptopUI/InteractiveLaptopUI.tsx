"use client";

import { useState } from "react";
import {
  Code2,
  FileText,
  ExternalLink,
  Folder,
  FileCode,
  Terminal,
  User,
  Mail,
  Award,
  CheckCircle,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function VSCodeTab() {
  return (
    <div className="flex h-full font-mono text-xs">
      <div className="w-48 bg-[#252526] border-r border-[#333] p-3 flex flex-col gap-2 text-neutral-400">
        <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-1">
          Explorer
        </div>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <Folder className="w-3.5 h-3.5 text-blue-400" />
          <span>portfolio-root</span>
        </div>
        <div className="pl-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-blue-400 bg-[#37373d] px-2 py-1 rounded">
            <FileCode className="w-3.5 h-3.5" />
            <span>portfolio.ts</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-neutral-200 cursor-pointer">
            <FileCode className="w-3.5 h-3.5 text-yellow-400" />
            <span>skills.json</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto text-neutral-300 leading-relaxed">
        <pre className="whitespace-pre-wrap">
          <span className="text-purple-400">export const</span>{" "}
          <span className="text-yellow-300">developerPortfolio</span> = {"{"}
          {"\n"} <span className="text-blue-300">name</span>:{" "}
          <span className="text-green-300">"Aya Aladdin"</span>,{"\n"}{" "}
          <span className="text-blue-300">role</span>:{" "}
          <span className="text-green-300">
            "Aspiring Full-Stack Web Developer"
          </span>
          ,{"\n"} <span className="text-blue-300">techStack</span>: [
          <span className="text-green-300">"Next.js"</span>,{" "}
          <span className="text-green-300">"HTML + CSS + JS"</span>,{" "}
          <span className="text-green-300">"Typescript"</span>,{" "}
          <span className="text-green-300">"Python"</span>],{"\n"}{" "}
          <span className="text-blue-300">featuredProjects</span>: [{"\n"} {"{"}
          {"\n"} <span className="text-blue-300">title</span>:{" "}
          <span className="text-green-300">
            "my interactive room portfolio (at 3am)"
          </span>
          ,{"\n"} <span className="text-blue-300">url</span>:{" "}
          <a
            href="https://github.com/aya-aladdin/desk-port"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            "https://github.com/aya-aladdin/desk-port"
          </a>
          {"\n"} {"}"},{"\n"} {"{"}
          {"\n"} <span className="text-blue-300">title</span>:{" "}
          <span className="text-green-300">"My hackathon landing-page"</span>,
          {"\n"} <span className="text-blue-300">url</span>:{" "}
          <a
            href="https://github.com/aya-aladdin/checkpoint"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            "https://github.com/aya-aladdin/checkpoint"
          </a>
          {"\n"} {"}"}
          {"\n"} ]{"\n"}
          {"}"};
        </pre>

        <div className="mt-6 border-t border-[#333] pt-3 flex items-center gap-2 text-neutral-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-green-400" />
          <span>Terminal: Build succeeded. Ready for deployment.</span>
        </div>
      </div>
    </div>
  );
}

function NotesTab() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 text-neutral-200 select-text">
      <div className="border-b border-neutral-700 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-yellow-400" />
          About Me & Contact
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Developer Notes • Personal Overview
        </p>
      </div>

      <div className="space-y-4 text-base leading-relaxed text-neutral-300">
        <p>
          Hi! I'm Aya, a student and aspiring software developer who loves
          building things, experimenting with new technologies, and turning
          random ideas into actual projects.
        </p>

        <p>
          I started with web development and have since explored backend
          development, game development, AI, and interactive web experiences.
          I'm especially interested in understanding how things work under the
          hood instead of just making them work through questionable amounts of
          copy-pasting.
        </p>

        <div className="bg-[#2d2d2d] p-5 rounded-lg border border-neutral-700/60 space-y-3 select-none">
          <div className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            Core Skills
          </div>

          <ul className="grid grid-cols-2 gap-3 text-sm text-neutral-300 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Web Development
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Backend Development
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              UI & UX
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Problem Solving
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Git & GitHub
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Game Development
            </li>
          </ul>
        </div>

        <div className="bg-[#2d2d2d] p-5 rounded-lg border border-neutral-700/60 space-y-3">
          <div className="font-semibold text-white text-xs uppercase tracking-wider">
            Currently Learning
          </div>

          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <span className="text-yellow-400">→</span> Artificial Intelligence
              & machine learning fundamentals
            </li>
            <li>
              <span className="text-yellow-400">→</span> LangGraph & AI
              application development
            </li>
            <li>
              <span className="text-yellow-400">→</span> JavaScript & modern web
              development
            </li>
            <li>
              <span className="text-yellow-400">→</span> Building interactive 3D
              web experiences
            </li>
          </ul>
        </div>

        <div className="bg-[#2d2d2d] p-5 rounded-lg border border-neutral-700/60 space-y-3">
          <div className="font-semibold text-white text-xs uppercase tracking-wider">
            Things I've Built
          </div>

          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <span className="text-blue-400">•</span> Interactive portfolio and
              personal web projects
            </li>
            <li>
              <span className="text-blue-400">•</span> Hackathon websites and
              landing pages
            </li>
            <li>
              <span className="text-blue-400">•</span> Games and prototypes
              using Unity and C#
            </li>
            <li>
              <span className="text-blue-400">•</span> Projects built through
              Hack Club and game jams
            </li>
          </ul>
        </div>

        <div className="bg-[#2d2d2d] p-5 rounded-lg border border-neutral-700/60 space-y-3">
          <div className="font-semibold text-white text-xs uppercase tracking-wider">
            Beyond Code
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Outside of programming, I enjoy guitar, rollerblading, swimming,
            reading, and working on creative projects. I'm also involved in
            student tech communities and enjoy hackathons, where I get to build
            things with other people and learn by actually doing.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-sm text-neutral-400">
            Currently: building, learning, breaking things, fixing them, and
            repeating the process.
          </p>
        </div>
      </div>

      <div className="pt-2 flex items-center gap-4 text-sm">
        <a
          href="mailto:ayaaladdin45@gmail.com"
          className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-md hover:bg-yellow-500/20 transition"
        >
          <Mail className="w-4 h-4" />
          <span>aya2aladdin@gmail.com</span>
        </a>
      </div>
    </div>
  );
}

export default function InteractiveLaptopUI() {
  const [activeTab, setActiveTab] = useState<"vscode" | "notes">("vscode");

  return (
    <div className="w-[1023px] h-[725px] bg-[#1e1e1e] text-neutral-200 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-neutral-700/50 font-sans select-none">
      <div className="h-12 bg-[#252526] flex items-center px-4 justify-between border-b border-[#333]">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 mr-4">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
          </div>

          <button
            onClick={() => setActiveTab("vscode")}
            className={`px-4 py-2 text-sm rounded-t flex items-center gap-2 transition ${
              activeTab === "vscode"
                ? "bg-[#1e1e1e] text-white border-t-2 border-blue-500"
                : "text-neutral-400 hover:bg-[#2a2d2e]"
            }`}
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>portfolio.ts</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 text-sm rounded-t flex items-center gap-2 transition ${
              activeTab === "notes"
                ? "bg-[#1e1e1e] text-white border-t-2 border-yellow-500"
                : "text-neutral-400 hover:bg-[#2a2d2e]"
            }`}
          >
            <FileText className="w-4 h-4 text-yellow-400" />
            <span>Developer_Notes.md</span>
          </button>
        </div>

        <a
          href="https://github.com/aya-aladdin"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 hover:text-white transition flex items-center gap-1.5 text-sm"
        >
          <GithubIcon className="w-5 h-5" />
          <span>GitHub</span>
          <ExternalLink className="w-4 h-4 ml-0.5" />
        </a>
      </div>

      <div className="flex-1 overflow-auto bg-[#1e1e1e]">
        {activeTab === "vscode" ? <VSCodeTab /> : <NotesTab />}
      </div>
    </div>
  );
}
