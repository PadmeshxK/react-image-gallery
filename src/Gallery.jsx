import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";
import { useState, useEffect } from "react";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const [lightboxImg, setLightboxImg] = useState(null);

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${url}&query=${searchTerm}`);
      return response.data;
    },
    keepPreviousData: true, 
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (response.isLoading) {
    return (
      <div className="images-container">
        <h4>Loading...</h4>
      </div>
    );
  }
  if (response.isError) {
    return (
      <div className="images-container">
        <h4>Error has occured!</h4>
      </div>
    );
  }
  const images = response.data.results;
  if (images.length === 0)
    return (
      <div className="images-container">
        <h4>No matches were found!</h4>
      </div>
    );

  const openLightbox = (img) => setLightboxImg(img);
  const closeLightbox = () => setLightboxImg(null);

  return (
    <>
      <div className="images-container">
        {images.map((image) => {
          return (
            <div
              className="image-wrapper"
              key={image.id}
              tabIndex={0} 
              onClick={() => openLightbox(image)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(image);
                }
              }}
              aria-label={`Open image by ${image.user?.name || "author"}`}
            >
              <img
                className="image"
                src={image?.urls?.regular}
                alt={image.alt_description || "Unsplash image"}
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
              />

              <div className="image-meta">
                <div className="meta-author">
                  {image.user?.name}
                </div>
                <div className="meta-actions">
                  <button
                    className="meta-btn"
                    onClick={(ev) => {
                      ev.stopPropagation(); 
                      window.open(image.links.html, "_blank");
                    }}
                    title="Open on Unsplash"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.urls.full || lightboxImg.urls.regular}
              alt={lightboxImg.alt_description || "Image"}
            />
          </div>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
export default Gallery;
