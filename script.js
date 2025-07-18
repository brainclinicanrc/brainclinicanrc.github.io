document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Header scroll effect
  const header = document.querySelector(".header")
  const logo = document.querySelector(".logo")
  const navLinks = document.querySelectorAll(".nav-link")
  const menuBtn = document.querySelector(".mobile-menu-btn")

  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll() // Initial check

  // Mobile menu toggle
  const mobileNav = document.querySelector(".mobile-nav")
  const menuIcon = document.querySelector(".menu-icon")
  const closeIcon = document.querySelector(".close-icon")

  function toggleMobileMenu() {
    mobileNav.classList.toggle("hidden")
    menuIcon.classList.toggle("hidden")
    closeIcon.classList.toggle("hidden")
  }

  menuBtn.addEventListener("click", toggleMobileMenu)

  // Smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll("[data-scroll]")

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("data-scroll")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (!mobileNav.classList.contains("hidden")) {
          toggleMobileMenu()
        }

        const headerHeight = header.offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Slideshow functionality
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".slide-btn.prev")
  const nextBtn = document.querySelector(".slide-btn.next")
  let currentSlide = 0
  let slideInterval

  // Initialize slideshow
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show the current slide
    slides[index].classList.add("active")
    dots[index].classList.add("active")
    currentSlide = index
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(() => {
      let nextSlide = currentSlide + 1
      if (nextSlide >= slides.length) {
        nextSlide = 0
      }
      showSlide(nextSlide)
    }, 5000) // Change slide every 5 seconds
  }

  // Stop slideshow on user interaction
  function stopSlideshow() {
    clearInterval(slideInterval)
  }

  // Initialize the first slide
  showSlide(0)
  startSlideshow()

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopSlideshow()
      let prevSlide = currentSlide - 1
      if (prevSlide < 0) {
        prevSlide = slides.length - 1
      }
      showSlide(prevSlide)
      startSlideshow()
    })
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopSlideshow()
      let nextSlide = currentSlide + 1
      if (nextSlide >= slides.length) {
        nextSlide = 0
      }
      showSlide(nextSlide)
      startSlideshow()
    })
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlideshow()
      showSlide(index)
      startSlideshow()
    })
  })

  // Pause slideshow when hovering over it
  const slideshowContainer = document.querySelector(".slideshow-container")
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", stopSlideshow)
    slideshowContainer.addEventListener("mouseleave", startSlideshow)
  }

  // Scroll animations
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  function checkScroll() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.85) {
        // Add delay if specified
        const delay = element.getAttribute("data-delay")
        if (delay) {
          setTimeout(() => {
            element.classList.add("visible")
          }, Number.parseInt(delay))
        } else {
          element.classList.add("visible")
        }
      }
    })
  }

  window.addEventListener("scroll", checkScroll)
  window.addEventListener("resize", checkScroll)
  checkScroll() // Initial check

  // Feedback form submission
  const feedbackForm = document.getElementById("feedback-form")
  const formSuccess = document.getElementById("form-success")

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // In a real application, you would send the form data to your server
      console.log("Feedback form submitted:", {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
      })

      // Show success message
      formSuccess.classList.remove("hidden")

      // Reset form
      this.reset()

      // Hide success message after 3 seconds
      setTimeout(() => {
        formSuccess.classList.add("hidden")
      }, 3000)
    })
  }

  // WhatsApp Chat
  const whatsappToggle = document.getElementById("whatsapp-toggle")
  const chatWindow = document.getElementById("chat-window")
  const chatMessages = document.getElementById("chat-messages")
  const chatForm = document.getElementById("chat-form")
  const chatInput = document.getElementById("chat-message")

  let isTyping = false

  function toggleChat() {
    chatWindow.classList.toggle("hidden")

    const toggleIcons = whatsappToggle.querySelectorAll("i")
    toggleIcons.forEach((icon) => icon.classList.toggle("hidden"))

    whatsappToggle.classList.toggle("active")

    // Add initial greeting if chat is empty
    if (!chatWindow.classList.contains("hidden") && chatMessages.children.length === 0) {
      setTimeout(() => {
        addBotMessage("Hello! Welcome to Brain Clinic. How can we help you today?")
      }, 500)
    }
  }

  whatsappToggle.addEventListener("click", toggleChat)

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${isUser ? "user" : "bot"}`

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    messageDiv.innerHTML = `
      <div class="message-text">${text}</div>
      <div class="message-time">${time}</div>
    `

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function addBotMessage(text) {
    addMessage(text, false)
  }

  function addUserMessage(text) {
    addMessage(text, true)
  }

  function showTypingIndicator() {
    if (isTyping) return

    isTyping = true
    const typingDiv = document.createElement("div")
    typingDiv.className = "typing-indicator"
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `

    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight

    return typingDiv
  }

  function hideTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator)
    }
    isTyping = false
  }

  function generateBotResponse(userMessage) {
    // Simple response logic based on keywords
    const message = userMessage.toLowerCase()
    let response =
      "Thank you for your message. One of our specialists will get back to you shortly. If you'd like to book an appointment, please click the 'Book an Appointment' button on our website."

    if (message.includes("appointment")) {
      response =
        "You can book an appointment by clicking the 'Book an Appointment' button on our website. We'll send you confirmation via WhatsApp."
    } else if (message.includes("location") || message.includes("address")) {
      response =
        "We're located at 123 Brain Health Rd, City, State. You can see our location on the map in the Contact section."
    } else if (message.includes("service") || message.includes("therapy")) {
      response =
        "We offer various services including Occupational Therapy, Stroke & Hand Rehabilitation, Special Education, ABA Therapy, Speech & Language Therapy, and more. Please visit our website for details."
    }

    return response
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const message = chatInput.value.trim()
      if (!message) return

      // Add user message
      addUserMessage(message)
      chatInput.value = ""

      // Show typing indicator
      const typingIndicator = showTypingIndicator()

      // Simulate response after delay
      setTimeout(() => {
        hideTypingIndicator(typingIndicator)
        const botResponse = generateBotResponse(message)
        addBotMessage(botResponse)
      }, 1500)
    })
  }

  // Appointment Modal
  const appointmentModal = document.getElementById("appointment-modal")
  const modalClose = document.getElementById("modal-close")
  const modalCancel = document.getElementById("modal-cancel")
  const modalSubmit = document.getElementById("modal-submit")
  const modalBody = document.getElementById("modal-body")
  const modalSuccess = document.getElementById("modal-success")
  const modalFooter = document.getElementById("modal-footer")
  const submitText = document.getElementById("submit-text")
  const submitLoading = document.getElementById("submit-loading")
  const appointmentForm = document.getElementById("appointment-form")

  // All appointment booking buttons
  const bookButtons = [
    document.getElementById("header-book-btn"),
    document.getElementById("mobile-book-btn"),
    document.getElementById("hero-book-btn"),
    document.getElementById("footer-book-btn"),
  ]

  function openModal() {
    appointmentModal.classList.remove("hidden")
    document.body.style.overflow = "hidden" // Prevent scrolling
  }

  function closeModal() {
    appointmentModal.classList.add("hidden")
    document.body.style.overflow = "" // Allow scrolling

    // Reset form state after a delay
    setTimeout(() => {
      modalBody.classList.remove("hidden")
      modalSuccess.classList.add("hidden")
      modalFooter.classList.remove("hidden")
      submitText.classList.remove("hidden")
      submitLoading.classList.add("hidden")

      if (appointmentForm) {
        appointmentForm.reset()
      }
    }, 300)
  }

  bookButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", openModal)
    }
  })

  if (modalClose) modalClose.addEventListener("click", closeModal)
  if (modalCancel) modalCancel.addEventListener("click", closeModal)

  // Close modal when clicking outside
  appointmentModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal()
    }
  })

  // Submit appointment form
  if (modalSubmit) {
    modalSubmit.addEventListener("click", () => {
      // Show loading state
      submitText.classList.add("hidden")
      submitLoading.classList.remove("hidden")

      // Get form data
      const formData = {}
      if (appointmentForm) {
        const formElements = appointmentForm.elements
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i]
          if (element.name) {
            formData[element.name] = element.value
          }
        }
      }

      // Simulate API call
      setTimeout(() => {
        console.log("Appointment booked:", formData)

        // Show success message
        modalBody.classList.add("hidden")
        modalSuccess.classList.remove("hidden")
        modalFooter.classList.add("hidden")

        // Reset and close modal after delay
        setTimeout(() => {
          closeModal()
        }, 3000)
      }, 1500)
    })
  }

  // Gallery functionality
  const featuredImage = document.getElementById("featured-image")
  const thumbs = document.querySelectorAll(".thumb")
  const prevBtnGallery = document.querySelector(".gallery-main .prev-btn")
  const nextBtnGallery = document.querySelector(".gallery-main .next-btn")
  const fullscreenBtn = document.querySelector(".gallery-fullscreen-btn")

  // Modal elements
  const galleryModal = document.getElementById("gallery-modal")
  const modalImage = document.getElementById("modal-image")
  const modalCaption = document.getElementById("modal-caption")
  const modalCloseGallery = document.getElementById("gallery-modal-close")
  const modalPrev = document.getElementById("modal-prev")
  const modalNext = document.getElementById("modal-next")

  let currentIndex = 0

  // Set active thumbnail and update featured image
  function setActiveThumbnail(index) {
    thumbs.forEach((thumb) => thumb.classList.remove("active"))
    thumbs[index].classList.add("active")

    const src = thumbs[index].getAttribute("data-src")
    const alt = thumbs[index].getAttribute("data-alt")

    featuredImage.src = src
    featuredImage.alt = alt
    currentIndex = index
  }

  // Initialize gallery
  if (thumbs.length > 0) {
    setActiveThumbnail(0)
  }

  // Thumbnail click event
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      setActiveThumbnail(index)
    })
  })

  // Previous button click
  if (prevBtnGallery) {
    prevBtnGallery.addEventListener("click", () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = thumbs.length - 1
      setActiveThumbnail(newIndex)
    })
  }

  // Next button click
  if (nextBtnGallery) {
    nextBtnGallery.addEventListener("click", () => {
      let newIndex = currentIndex + 1
      if (newIndex >= thumbs.length) newIndex = 0
      setActiveThumbnail(newIndex)
    })
  }

  // Open fullscreen modal
  if (fullscreenBtn && galleryModal) {
    fullscreenBtn.addEventListener("click", () => {
      modalImage.src = featuredImage.src
      modalImage.alt = featuredImage.alt
      modalCaption.textContent = thumbs[currentIndex].querySelector(".thumb-caption").textContent
      galleryModal.classList.remove("hidden")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })
  }

  // Close modal
  if (modalCloseGallery) {
    modalCloseGallery.addEventListener("click", () => {
      galleryModal.classList.add("hidden")
      document.body.style.overflow = "" // Allow scrolling
    })
  }

  // Modal previous button
  if (modalPrev) {
    modalPrev.addEventListener("click", () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = thumbs.length - 1

      const src = thumbs[newIndex].getAttribute("data-src")
      const alt = thumbs[newIndex].getAttribute("data-alt")
      const caption = thumbs[newIndex].querySelector(".thumb-caption").textContent

      modalImage.src = src
      modalImage.alt = alt
      modalCaption.textContent = caption
      currentIndex = newIndex
    })
  }

  // Modal next button
  if (modalNext) {
    modalNext.addEventListener("click", () => {
      let newIndex = currentIndex + 1
      if (newIndex >= thumbs.length) newIndex = 0

      const src = thumbs[newIndex].getAttribute("data-src")
      const alt = thumbs[newIndex].getAttribute("data-alt")
      const caption = thumbs[newIndex].querySelector(".thumb-caption").textContent

      modalImage.src = src
      modalImage.alt = alt
      modalCaption.textContent = caption
      currentIndex = newIndex
    })
  }

  // Close modal when clicking outside the image
  if (galleryModal) {
    galleryModal.addEventListener("click", function (e) {
      if (e.target === this) {
        galleryModal.classList.add("hidden")
        document.body.style.overflow = "" // Allow scrolling
      }
    })
  }

  // Keyboard navigation for gallery modal
  document.addEventListener("keydown", (e) => {
    if (galleryModal && !galleryModal.classList.contains("hidden")) {
      if (e.key === "Escape") {
        galleryModal.classList.add("hidden")
        document.body.style.overflow = "" // Allow scrolling
      } else if (e.key === "ArrowLeft") {
        modalPrev.click()
      } else if (e.key === "ArrowRight") {
        modalNext.click()
      }
    }
  })
})
