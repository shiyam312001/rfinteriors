// Read counts from the static gallery content so outputs match the site.
(async () => {
  try {
    const mod = await import(`../lib/gallery-content.js`);
    const images = mod.galleryImages || [];

    const counts = images.reduce((acc, image) => {
      const category = image.category || "All";
      acc[category] = (acc[category] ?? 0) + 1;
      return acc;
    }, {});

    console.log("\nRF Interior Spot — Gallery Category Counts (from gallery-content)\n");
    console.log(`Total gallery images: ${images.length}\n`);

    if (Object.keys(counts).length === 0) {
      console.log("No images found in lib/gallery-content.js or no images defined.");
    } else {
      Object.entries(counts)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([category, count]) => {
          console.log(`  ${category}: ${count}`);
        });
      console.log("\nUse lib/manualAssignments.js to change categories manually.\n");
    }
  } catch (err) {
    console.error("Failed to read lib/gallery-content.js:", err);
  }
})();
