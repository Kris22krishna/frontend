import React from 'react';
import { Target, Lightbulb, Shield, HeartHandshake, Eye, BookOpen } from 'lucide-react';
import { ParkScene, MarketScene, BuilderScene } from '../OurCommunityVisuals';

export const ourCommunityIntroData = {
  title: "What is a Community?",
  subtitle: "Explore the people, places, and connections around us.",
  prerequisites: [
    "You know where your home is.",
    "You communicate with your family and neighbors.",
    "You visit places like parks or markets."
  ],
  cards5W1H: [
    {
      id: "what",
      q: "What is a Community?",
      icon: <Target />,
      color: "#4f46e5",
      content: "A community is a space we share with other people where we live, work, and play together.",
      fact: "Communities share spaces like roads, parks, and markets!",
      visual: <ParkScene />
    },
    {
      id: "who",
      q: "Who is in a Community?",
      icon: <HeartHandshake />,
      color: "#ec4899",
      content: "A community depends on people who help us every day. Think about shopkeepers, teachers, doctors, and the police.",
      fact: "Each occupation requires special tools. A mason uses a trowel and bricks!",
      visual: <MarketScene />
    },
    {
      id: "when",
      q: "When do communities celebrate?",
      icon: <Lightbulb />,
      color: "#f59e0b",
      content: "We celebrate festivals together to create bonds. In July, we celebrate Van Mahotsav by planting trees.",
      fact: "In Assam, people feast together during Uruka on January 14th!",
      visual: <BuilderScene /> // Replacing with builder scene or similar
    },
    {
      id: "where",
      q: "Where do we interact?",
      icon: <Eye />,
      color: "#10b981",
      content: "We meet at public places like schools, playgrounds, bus stops, and post offices.",
      fact: "Public places bring us closer to create beautiful memories.",
      visual: <ParkScene />
    },
    {
      id: "why",
      q: "Why do we need each other?",
      icon: <Shield />,
      color: "#8b5cf6",
      content: "Communities thrive on cooperation and mutual respect. Things like building bridges or maintaining local parks require teamwork.",
      fact: "Just like ants and bees, humans work together to make life better for everyone!",
      visual: <BuilderScene />
    },
    {
      id: "how",
      q: "How can you help?",
      icon: <BookOpen />,
      color: "#f97316",
      content: "You can keep your neighborhood clean, plant trees, and help your neighbors during times of need.",
      fact: "Working together turns impossible tasks into easy and fun ones!",
      visual: <MarketScene />
    }
  ]
};
