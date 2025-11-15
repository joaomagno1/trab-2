interface MessageProps {
  error?: boolean;
  message?: string | string[];
}

const ErrorMessage = ({ error, message }: MessageProps) => {
  const unique = Array.from(
    new Set(typeof message === "string" ? [message] : message || []),
  );

  return (
    <>
      {error && unique.length > 0 && (
        <div className="invalid-feedback">
          {unique.map((item, index) => (
            <p key={index} style={{ margin: "0", color: "red" }}>
              <span>{item}</span>
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
