import { useState, useRef, useEffect } from "react";
import formatString from "../../utils/formatString";
import { useNuiEvent } from "../../Hooks/useNuiEvent";
import darkenColor from "../../utils/darkenColor";
import { fetchNui } from "../../utils/fetchNui";
interface KeyboardProps {
  Title: string;
  Subtitle?: string;
  Placeholder?: string;
  DefaultValue?: string;
  MaxLength: number;
  Color: string;
}

function KeyboardInput() {
  const [visible, SetVisible] = useState<boolean>(false);
  const [title, SetTitle] = useState<string>("");
  const [subtitle, SetSubtitle] = useState<string>("");
  const [placeHolder, SetPlaceHolder] = useState<string>("");
  const [maxLength, SetMaxLength] = useState<number>(15);
  const [inputValue, setInputValue] = useState<string>("");
  const [color, SetColor] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    if (!theme) {
      fetchNui("zUI-GetTheme", {});
    }
  });

  useNuiEvent("zUI-SetTheme", (data: any) => {
    setTheme(data.theme);
  });

  useNuiEvent<KeyboardProps>("zUI-KeyboardInput", (data) => {
    SetTitle(data.Title);
    if (data.Subtitle) {
      SetSubtitle(data.Subtitle);
    }
    if (data.Placeholder) {
      SetPlaceHolder(data.Placeholder);
    }
    if (data.DefaultValue) {
      setInputValue(data.DefaultValue);
    }
    SetMaxLength(data.MaxLength);
    SetColor(theme?.items?.defaultColor);
    SetVisible(true);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchNui("zUI-KeyboardResult", { inputValue: inputValue });
    SetVisible(false);
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    fetchNui("zUI-KeyboardCancel", {});
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
        <div id="keyboardInput-container">
          <div id="keyboardInput">
            <div id="keyboardInput-informations">
              <h1 id="keyboardInput-Title">{formatString(title)}</h1>
              <h1 id="keyboardInput-Subtitle">{formatString(subtitle)}</h1>
            </div>
            <form id="keyboardInput-form" onSubmit={handleSubmit}>
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                placeholder={placeHolder}
                maxLength={maxLength}
                onChange={(e) => setInputValue(e.target.value)}
                id="keyboardInput-input"
              />
              <div id="keyboardInput-buttons">
                <button
                  type="submit"
                  id="keyboardInput-buttonprimary"
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
                  id="keyboardInput-buttonsecondary"
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default KeyboardInput;
