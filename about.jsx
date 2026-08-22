import ClassioNav from "./classio-nav.jsx";

const aboutImages = [
  {
    src: "/about/developers.png",
    alt: "Follow the Developers — Winston Ta, Amanda Gantugs, Mometa Uddin, and Jason Ramirez",
  },
  {
    src: "/about/classio-brand.png",
    alt: "Classio — Build your academic journey",
  },
  {
    src: "/about/the-problem.png",
    alt: "The problem Classio is trying to solve",
  },
  {
    src: "/about/flowchart.png",
    alt: "Classio architecture and user experience flowchart",
  },
  {
    src: "/about/features.png",
    alt: "What Classio does",
  },
  {
    src: "/about/long-beach.png",
    alt: "How Classio relates to Long Beach",
  },
  {
    src: "/about/anyone-can-do-this.png",
    alt: "Anyone can do this",
  },
];

export default function About({ onNavigate, onGoHome, actionLabel, onAction }) {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <ClassioNav
        activePage="about"
        onNavigate={onNavigate}
        onLogoClick={onGoHome}
        actionLabel={actionLabel}
        onAction={onAction}
      />

      <div className="flex flex-1 flex-col items-center gap-10 px-4 py-12 md:px-8">
        {aboutImages.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="h-auto w-full max-w-5xl"
          />
        ))}
      </div>
    </main>
  );
}
