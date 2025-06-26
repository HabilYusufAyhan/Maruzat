import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Alert = ({ type, title, message, onClose, autoClose = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          closeButton: "text-red-400 hover:text-red-600",
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
          closeButton: "text-yellow-400 hover:text-yellow-600",
        };
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          closeButton: "text-green-400 hover:text-green-600",
        };
      case "info":
      default:
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: <Info className="h-5 w-5 text-blue-500" />,
          closeButton: "text-blue-400 hover:text-blue-600",
        };
    }
  };

  const styles = getAlertStyles();

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${styles.container}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>

        <div className="flex-grow">
          {title && <h4 className="font-medium text-sm mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>

        {onClose && (
          <button
            onClick={handleClose}
            className={`flex-shrink-0 ml-2 ${styles.closeButton} transition-colors`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
