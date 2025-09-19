import { projectsData } from "@/utils/data/projects-data"; // adjust path if needed

export default function ProjectDetails({ params, searchParams }) {
  const { index } = params;
  const { name } = searchParams || {};

  const project = projectsData.find((p) => p.id === Number(index));

  // Handle case when project is not found
  if (!project) {
    return <div className="p-8 text-center">Project not found</div>;
  }

  return (
    <div className="py-8">
      {/* Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            {project.name}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Description */}
      <p className="text-justify max-w-3xl mx-auto mb-6">
        {project.description}
      </p>

      {/* Role */}
      <p className="text-center font-semibold mb-6">Role: {project.role}</p>

      {/* Tools */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">Tools Used:</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tools.map((tool, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {Object.keys(project)
          .filter((key) => key.startsWith("image") && project[key]) // get all image keys that are not empty
          .map((key, idx) => (
            <img
              key={idx}
              src={`/${project[key]}`} // assuming your images are in public/projects/...
              alt={`${project.name} ${key}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))}
      </div>
    </div>
  );
}
