interface ErrorMessageProps {
  error?: boolean;
  message?: string | string[];
}

const ErrorMessage = ({ error, message }: ErrorMessageProps) => {
  // Garantindo que a mensagem seja sempre um array único
  const uniqueMessages = Array.from(
    new Set(typeof message === "string" ? [message] : message || []),
  );

  return (
    <>
      {error && uniqueMessages.length > 0 && (
        <div className="invalid-feedback">
          {uniqueMessages.map((item, index) => (
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