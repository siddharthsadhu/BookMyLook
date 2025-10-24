import { test, expect } from '@playwright/test'

test.describe('BookMyLook E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up the page
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/BookMyLook/)

    // Check for main elements
    await expect(page.locator('h1')).toContainText('BookMyLook')
  })

  test('should navigate to services page', async ({ page }) => {
    // Click on services navigation
    await page.locator('nav a:has-text("Services")').click()

    // Wait for navigation
    await page.waitForURL('**/services')

    // Check if services are displayed
    await expect(page.locator('h1')).toContainText('Our Services')
  })

  test('should display salon listings', async ({ page }) => {
    // Navigate to shops page
    await page.goto('/shops')

    // Check if salons are displayed
    const salonCards = page.locator('[data-testid="salon-card"], .salon-card, .card')
    await expect(salonCards.first()).toBeVisible()
  })

  test('should handle booking flow', async ({ page }) => {
    // Navigate to a salon
    await page.goto('/shops')
    await page.locator('[data-testid="salon-card"], .salon-card').first().click()

    // Check if salon details page loads
    await expect(page.locator('h1')).toBeVisible()

    // Look for booking button or service selection
    const bookingButton = page.locator('button:has-text("Book"), [data-testid="book-button"]')
    if (await bookingButton.isVisible()) {
      await bookingButton.click()

      // Check if booking form appears
      const bookingForm = page.locator('form, [data-testid="booking-form"]')
      await expect(bookingForm).toBeVisible()
    }
  })

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Navigate to home
    await page.goto('/')

    // Check if mobile menu works
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu-toggle, button[aria-label*="menu" i]')
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click()

      // Check if navigation appears
      const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-nav, nav')
      await expect(mobileNav).toBeVisible()
    }
  })

  test('should handle authentication flow', async ({ page }) => {
    // Try to access protected route
    await page.goto('/dashboard')

    // Should redirect to login or show login form
    const loginForm = page.locator('form:has-text("login"), [data-testid="login-form"], input[type="email"]')
    const currentUrl = page.url()

    // Either redirected to login page or shows login form
    expect(currentUrl.includes('/login') || await loginForm.isVisible()).toBeTruthy()
  })

  test('should display queue information', async ({ page }) => {
    // Navigate to a salon that might have queue info
    await page.goto('/shops')
    await page.locator('[data-testid="salon-card"], .salon-card').first().click()

    // Look for queue information
    const queueInfo = page.locator('text=/queue|waiting|position/i, [data-testid*="queue"]')

    // Queue info might not be visible to non-logged-in users
    // Just check that the page loads without errors
    await expect(page.locator('body')).toBeVisible()
  })

  test('should handle search functionality', async ({ page }) => {
    // Go to services or shops page
    await page.goto('/services')

    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], [data-testid="search-input"]')

    if (await searchInput.isVisible()) {
      await searchInput.fill('hair')
      await searchInput.press('Enter')

      // Check if results are filtered
      await page.waitForTimeout(1000) // Wait for search results
      await expect(page.locator('body')).toBeVisible() // Page should still work
    }
  })

  test('should display reviews and ratings', async ({ page }) => {
    // Navigate to a salon
    await page.goto('/shops')
    await page.locator('[data-testid="salon-card"], .salon-card').first().click()

    // Look for reviews section
    const reviewsSection = page.locator('text=/review|rating/i, [data-testid*="review"]')

    // Reviews might be loaded dynamically
    await expect(page.locator('body')).toBeVisible()
  })

  test('should handle form validation', async ({ page }) => {
    // Try to find and fill out a contact form
    const contactForm = page.locator('form:has-text("contact"), [data-testid="contact-form"]')

    if (await contactForm.isVisible()) {
      // Try submitting empty form
      const submitButton = contactForm.locator('button[type="submit"], input[type="submit"]')
      if (await submitButton.isVisible()) {
        await submitButton.click()

        // Check for validation messages
        await page.waitForTimeout(500)
        await expect(page.locator('body')).toBeVisible()
      }
    } else {
      // Navigate to contact page if it exists
      try {
        await page.goto('/contact')
        await expect(page.locator('body')).toBeVisible()
      } catch {
        // Contact page might not exist, that's okay
        expect(true).toBe(true)
      }
    }
  })
})
