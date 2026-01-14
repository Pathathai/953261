document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        const postId = button.getAttribute("data-post-id");
        try {
            const response = await fetch(`/posts/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                button.querySelector(".like-count").innerText = data.likes;
            } else {
                console.error("Failed to like the post");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});