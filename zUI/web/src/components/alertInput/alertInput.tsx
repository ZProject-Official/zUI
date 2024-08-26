import { useState, useRef, useEffect } from "react";
import formatString from "../../utils/formatString";
import { useNuiEvent } from "../../Hooks/useNuiEvent";
import darkenColor from "../../utils/darkenColor";
import { fetchNui } from "../../utils/fetchNui";

interface AlertProps {
  Title: string;
  Subtitle?: string;
  Description: string;
  Placeholder?: string;
  MaxLength: number;
  Color: string;
}

function AlertInput() {
  const [visible, SetVisible] = useState<boolean>(false);
  const [title, SetTitle] = useState<string>("");
  const [subtitle, SetSubtitle] = useState<string>("");
  const [description, SetDescription] = useState<string>("");
  const [color, SetColor] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useNuiEvent<AlertProps>("zUI-AlertInput", (data) => {
    SetTitle(data.Title);
    if (data.Subtitle) {
      SetSubtitle(data.Subtitle);
    }
    SetDescription(data.Description);
    SetColor(data.Color);
    SetVisible(true);
  });

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    fetchNui("zUI-AlertResult", { inputValue: true });
    SetVisible(false);
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    fetchNui("zUI-AlertCancel", { inputValue: false });
    SetVisible(false);
  };

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <div id="alertInput-container">
          <div id="alertInput">
            <div id="alertInput-informations">
              <h1 id="alertInput-Title">{formatString(title)}</h1>
              <h1 id="alertInput-Subtitle">{formatString(subtitle)}</h1>
            </div>
            <h1 id="alertInput-Description">{formatString(description)}</h1>
            <div id="alertInput-buttons">
              <button
                type="submit"
                id="alertInput-buttonprimary"
                onClick={handleSubmit}
                style={{
                  background: `linear-gradient(${color}, ${darkenColor(
                    color,
                    45
                  )})`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 15px ${darkenColor(
                    color,
                    45
                  )}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0px ${darkenColor(
                    color,
                    45
                  )}`)
                }
              >
                Valider
              </button>
              <button
                type="button"
                id="alertInput-buttonsecondary"
                style={{
                  outlineColor: color,
                  color,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 15px ${color}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 0px ${color}`)
                }
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AlertInput;
