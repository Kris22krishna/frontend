import React from "react";
import { AlertCircle, ArrowRight, BadgeCheck, Lightbulb } from "lucide-react";
import MathRenderer from "../../../MathRenderer";

const LEVEL_STYLES = {
  Easy: { background: "#dcfce7", color: "#166534" },
  Medium: { background: "#fef9c3", color: "#854d0e" },
  Hard: { background: "#fee2e2", color: "#991b1b" },
};

export default function InteractiveExamQuestionCard({
  item,
  index,
  accentColor,
  textColor = "#1e293b",
}) {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const levelStyle = LEVEL_STYLES[item.level] ?? {
    background: "#e2e8f0",
    color: "#475569",
  };
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === item.correct;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: 24,
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 24px rgba(15,23,42,0.04)",
        display: "grid",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "5px 12px",
            borderRadius: 999,
            ...levelStyle,
          }}
        >
          {item.level}
        </span>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8" }}>
          Q{index + 1}
        </span>
      </div>

      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: textColor,
          lineHeight: 1.65,
        }}
      >
        <MathRenderer text={item.q} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 10,
        }}
      >
        {item.options.map((option, optionIndex) => {
          const optionLabel = String.fromCharCode(65 + optionIndex);
          const picked = selectedOption === optionIndex;
          const correct = isAnswered && optionIndex === item.correct;
          const wrong = isAnswered && picked && !correct;

          let borderColor = "#e2e8f0";
          let background = "#f8fafc";
          let color = "#475569";
          let badgeBackground = `${accentColor}14`;
          let badgeColor = accentColor;

          if (correct) {
            borderColor = "#10b981";
            background = "rgba(16, 185, 129, 0.10)";
            color = "#065f46";
            badgeBackground = "rgba(16, 185, 129, 0.14)";
            badgeColor = "#047857";
          } else if (wrong) {
            borderColor = "#ef4444";
            background = "rgba(239, 68, 68, 0.10)";
            color = "#991b1b";
            badgeBackground = "rgba(239, 68, 68, 0.14)";
            badgeColor = "#b91c1c";
          } else if (picked) {
            borderColor = accentColor;
            background = `${accentColor}12`;
            color = textColor;
            badgeBackground = `${accentColor}18`;
          }

          return (
            <button
              key={`${item.q}-${optionIndex}`}
              type="button"
              disabled={isAnswered}
              onClick={() => setSelectedOption(optionIndex)}
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                background,
                border: `2px solid ${borderColor}`,
                fontSize: 14,
                color,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                textAlign: "left",
                cursor: isAnswered ? "default" : "pointer",
                transition: "all 0.2s ease",
                width: "100%",
                minHeight: 82,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  background: badgeBackground,
                  color: badgeColor,
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {optionLabel}
              </span>
              <span
                style={{
                  display: "block",
                  minWidth: 0,
                  lineHeight: 1.55,
                  color,
                }}
              >
                <MathRenderer text={option} />
              </span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          style={{
            borderRadius: 18,
            padding: 16,
            border: `1px solid ${isCorrect ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
            background: isCorrect ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            display: "grid",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: isCorrect ? "#047857" : "#b91c1c",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            {isCorrect ? <BadgeCheck size={18} /> : <AlertCircle size={18} />}
            {isCorrect ? "Correct answer" : "That one is incorrect"}
          </div>

          {!isCorrect && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#0f172a",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <ArrowRight size={16} color={accentColor} />
              Correct option: {String.fromCharCode(65 + item.correct)}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              color: "#475569",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            <Lightbulb size={16} color={accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <MathRenderer text={item.explanation} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
