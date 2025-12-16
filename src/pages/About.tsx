const About = () => {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'C', 'Git', 'AWS'];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed mb-12">
          <p>
            I'm Joe Croney, a Computer Science student at Cal Poly San Luis Obispo.
            I focus on building practical software solutions with interests in
            artificial intelligence, machine learning, and systems programming.
          </p>

          <p>
            My journey in technology started in high school and has grown through
            coursework and personal projects. I enjoy turning complex problems into
            clean, maintainable code.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-gray-600 bg-gray-50 px-4 py-2 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
          <p className="text-gray-600">
            California Polytechnic State University, San Luis Obispo
          </p>
          <p className="text-gray-500">B.S. Computer Science</p>
        </div>
      </div>
    </div>
  );
};

export default About;
