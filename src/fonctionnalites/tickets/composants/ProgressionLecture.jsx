// ProgressionLecture.jsx - avancement de la lecture OCR.
function ProgressionLecture({ progression }) {
  return (
    <div className="carte" role="status">
      <p>Lecture du ticket en cours… {progression} %</p>
      <progress value={progression} max={100} />
    </div>
  );
}

export default ProgressionLecture;
