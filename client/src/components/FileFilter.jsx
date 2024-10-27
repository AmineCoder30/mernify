import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function FileFilter() {
  const { messages } = useSelector((state) => state.messages);
  const [links, setLinks] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [filter, setFilter] = useState("media");

  function extractLinks(messages) {
    const urlPattern = /https?:\/\/[^\s]+/g;
    messages.forEach((message) => {
      // Check if message and message.content are defined and if content is a string
      if (message && typeof message.content === "string") {
        const matches = message.content.match(urlPattern);
        if (matches) {
          setLinks((prevLinks) => [...prevLinks, matches]);
          console.log(links);
        }
      }
    });
  }

  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      // Extract media items
      const media = messages
        .filter((message) => message.image)
        .map((message) => message.image);
      setMediaItems(media);

      // Extract links
      extractLinks(messages);
    }
  }, [messages]);

  return (
    <div className="mt-3">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("media")}
          className={`p-2 py-1 rounded-xl ${
            filter === "media"
              ? "bg-[#E4F2FF] text-[#2176FF]"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          Media
        </button>
        <button
          onClick={() => setFilter("links")}
          className={`p-2 py-1 rounded-xl ${
            filter === "links"
              ? "bg-[#E4F2FF] text-[#2176FF]"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          Links
        </button>
      </div>
      <div className="overflow-auto h-[300px]">
        {filter === "media" ? (
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.map((mediaItem, index) => (
              <img
                key={index}
                src={mediaItem}
                alt={`Media ${index + 1}`}
                className="w-full object-cover h-16 rounded-lg shadow-lg"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2 h-full overflow-auto">
            {links.length > 0 ? (
              links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  className="block bg-[#fbfbfb] p-2 text-blue-500 hover:underline shadow-sm rounded-md  "
                >
                  {link}
                </a>
              ))
            ) : (
              <p>No links available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileFilter;
