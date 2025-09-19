import { projectsData } from "@/utils/data/projects-data";
import { MdDownload } from "react-icons/md";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="w-full my-12 overflow-x-hidden">
        <Marquee
          gradient={false}
          speed={150} // slower or faster scroll
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="right"
        >
          <div className="flex flex-row gap-6">
            {projectsData.concat(projectsData).map((project, index) => (
              <div
                id={`card-${index + 1}`}
                key={index}
                className="min-w-[300px] max-w-sm flex-shrink-0"
              >
                <div className="h-full box-border flex flex-col rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-500 p-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>

                  {/* Image */}
                  <div className="flex-grow flex items-center justify-center">
                    <img
                      src={project.feature}
                      alt={project.name}
                      className="h-full w-auto rounded-lg"
                    />
                  </div>

                  {/* Button at bottom */}
                  <div className="items-center mt-4">
                    {project.url ? (
                      // 🔗 External link
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
                      >
                        <button className="flex items-center gap-1 px-3 md:px-8 py-3 md:py-4 text-xs md:text-sm font-medium md:font-semibold uppercase tracking-wider rounded-full bg-[#0d1224] text-white transition-all duration-200 ease-out hover:gap-3">
                          <span>Visit Website</span>
                          <MdDownload size={16} className="-rotate-90" />
                        </button>
                      </a>
                    ) : (
                      // 🔗 Internal Next.js route
                      <Link
                        href={{
                          pathname: `/details/${project.id}`,
                          query: { name: project.name },
                        }}
                        className="inline-block bg-gradient-to-r from-violet-600 to-pink-500 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
                      >
                        <button className="flex items-center gap-1 px-3 md:px-8 py-3 md:py-4 text-xs md:text-sm font-medium md:font-semibold uppercase tracking-wider rounded-full bg-[#0d1224] text-white transition-all duration-200 ease-out hover:gap-3">
                          <span>See More</span>
                          <MdDownload size={16} className="-rotate-90" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Projects;
