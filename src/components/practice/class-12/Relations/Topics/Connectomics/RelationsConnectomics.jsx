import React from "react";
import { AlertTriangle, ArrowRight, Share2 } from "lucide-react";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import RelationsTopNav from "../../RelationsTopNav";
import { relationsConnectomicsData as data } from "./RelationsConnectomicsData";

export default function RelationsConnectomics() {
  return (
    <div className="rel-page">
      <RelationsTopNav active="connectomics" backLabel="Back to Relations" />

      <div className="rel-intro-hero">
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Relations <span className="rel-intro-hero-highlight">Connectomics</span>
          </h1>
          <p className="rel-intro-hero-sub">
            Discover how Relations connect set theory, functions, logic, graphs, and data systems.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <h2
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 32,
            textAlign: "center",
            color: "var(--rel-text)",
          }}
        >
          The Web of Relations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 60,
          }}
        >
          {data.conceptMap.links.map((link, index) => {
            const fromNode = data.conceptMap.nodes.find((node) => node.id === link.from);
            const toNode = data.conceptMap.nodes.find((node) => node.id === link.to);

            if (!fromNode || !toNode) return null;

            return (
              <div
                key={`${link.from}-${link.to}`}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 4,
                    height: "100%",
                    background: fromNode.color,
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 24 }}>{fromNode.icon}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      background: `${fromNode.color}15`,
                      color: fromNode.color,
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    Connection {index + 1}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: 800, color: "var(--rel-text)" }}>{fromNode.label}</span>
                  <ArrowRight size={16} color="#94a3b8" />
                  <span style={{ fontWeight: 800, color: fromNode.color }}>{toNode.label}</span>
                </div>

                <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                  <MathRenderer text={link.tooltip} />
                </p>
              </div>
            );
          })}
        </div>

        <h2
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 32,
            textAlign: "center",
            color: "var(--rel-text)",
          }}
        >
          Real World Systems
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginBottom: 60,
          }}
        >
          {data.topicBreakdown.map((topic) => (
            <div
              key={topic.id}
              style={{
                background: "linear-gradient(135deg, #0f172a, #312e81)",
                padding: 32,
                borderRadius: 24,
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#f59e0b",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                Zone {topic.id}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{topic.title}</h3>
              <p style={{ margin: 0, opacity: 0.84, fontSize: 15, lineHeight: 1.6 }}>
                <MathRenderer text={topic.concepts} />
              </p>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 32,
            textAlign: "center",
            color: "var(--rel-text)",
          }}
        >
          Common Misconceptions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 60,
          }}
        >
          {data.misconceptions.map((item) => (
            <div
              key={item.statement}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 24,
                border: "1px solid #fee2e2",
                boxShadow: "0 4px 12px rgba(239,68,68,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 4,
                  height: "100%",
                  background: "#ef4444",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 8,
                  color: "#ef4444",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <MathRenderer text={item.statement} />
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                <MathRenderer text={item.truth} />
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: "center",
            background: "#f8fafc",
            padding: "40px 28px",
            borderRadius: 32,
            border: "2px dashed #e2e8f0",
            display: "grid",
            justifyItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(14,165,233,0.12))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Share2 size={34} color="#6366f1" />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--rel-text)", margin: 0 }}>
            Infinite Connections
          </h3>
          <p style={{ maxWidth: 640, margin: 0, color: "#64748b", lineHeight: 1.7 }}>
            Relations are not just a chapter. They are the language behind mappings, social
            networks, database tables, and every system built on structured connections.
          </p>
        </div>
      </main>
    </div>
  );
}
