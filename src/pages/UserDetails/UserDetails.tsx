/**
 * UserDetails Page
 * Displays comprehensive user information with localStorage caching
 * Based on Figma "Users - general details.png"
 */

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import { Button, Loader } from '@/components/common'
import { getUserById } from '@/services/user.service'
import { getFromLocalStorage, setInLocalStorage } from '@/hooks/useLocalStorage'
import type { IUser } from '@/types/user.types'
import styles from './UserDetails.module.scss'

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app'

/**
 * UserDetails page component
 * Implements localStorage caching as per requirements
 */
const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('general')

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID not provided')
        setLoading(false)
        return
      }

      try {
        // Try to get from localStorage first
        const cachedUser = getFromLocalStorage<IUser | null>(`user_${userId}`, null)

        if (cachedUser && cachedUser.id === userId) {
          console.log('Loading user from localStorage cache')
          setUser(cachedUser)
          setLoading(false)
        } else {
          // Fetch from API if not in cache
          console.log('Fetching user from API')
          const userData = await getUserById(userId)

          if (userData) {
            setUser(userData)
            // Cache in localStorage
            setInLocalStorage(`user_${userId}`, userData)
          } else {
            setError('User not found')
          }
          setLoading(false)
        }
      } catch (err) {
        console.error('Error fetching user:', err)
        setError('Failed to load user details')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const renderStars = (tier: number) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3].map((star) => (
          <svg
            key={star}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={star <= tier ? '#E9B200' : '#E0E0E0'}
          >
            <path d="M8 1L10 6H15L11 9L12.5 14L8 11L3.5 14L5 9L1 6H6L8 1Z" />
          </svg>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.loadingContainer}>
          <Loader size="large" />
        </div>
      </DashboardLayout>
    )
  }

  if (error || !user) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error || 'User not found'}</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Users</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className={styles.userDetails}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Back to Users</span>
        </button>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>User Details</h1>
          <div className={styles.actions}>
            <Button variant="danger">BLACKLIST USER</Button>
            <Button variant="primary">ACTIVATE USER</Button>
          </div>
        </div>

        {/* User Info Card */}
        <div className={styles.userCard}>
          <div className={styles.userHeader}>
            <div className={styles.userBasicInfo}>
              <div className={styles.avatar}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.fullName} />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="15" r="7" stroke="#213F7D" strokeWidth="2" />
                    <path
                      d="M8 32C8 25 13 22 20 22C27 22 32 25 32 32"
                      stroke="#213F7D"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{user.fullName}</h2>
                <p className={styles.userId}>{user.id}</p>
              </div>
            </div>

            <div className={styles.userTier}>
              <p className={styles.tierLabel}>User's Tier</p>
              {renderStars(user.userTier)}
            </div>

            <div className={styles.userAccount}>
              <h3 className={styles.accountBalance}>₦{user.accountBalance}</h3>
              <p className={styles.accountInfo}>
                {user.accountNumber}/{user.accountBank}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'general' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General Details
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'documents' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'bank' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('bank')}
            >
              Bank Details
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'loans' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('loans')}
            >
              Loans
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'savings' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('savings')}
            >
              Savings
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'app' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('app')}
            >
              App and System
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className={styles.detailsCard}>
            {/* Personal Information */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>FULL NAME</p>
                  <p className={styles.infoValue}>{user.personalInfo.fullName}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>PHONE NUMBER</p>
                  <p className={styles.infoValue}>{user.personalInfo.phoneNumber}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>EMAIL ADDRESS</p>
                  <p className={styles.infoValue}>{user.personalInfo.emailAddress}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>BVN</p>
                  <p className={styles.infoValue}>{user.personalInfo.bvn}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>GENDER</p>
                  <p className={styles.infoValue}>{user.personalInfo.gender}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>MARITAL STATUS</p>
                  <p className={styles.infoValue}>{user.personalInfo.maritalStatus}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>CHILDREN</p>
                  <p className={styles.infoValue}>{user.personalInfo.children}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>TYPE OF RESIDENCE</p>
                  <p className={styles.infoValue}>{user.personalInfo.typeOfResidence}</p>
                </div>
              </div>
            </section>

            {/* Education and Employment */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Education and Employment</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>LEVEL OF EDUCATION</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.levelOfEducation}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>EMPLOYMENT STATUS</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.employmentStatus}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>SECTOR OF EMPLOYMENT</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.sectorOfEmployment}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>DURATION OF EMPLOYMENT</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.durationOfEmployment}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>OFFICE EMAIL</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.officeEmail}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>MONTHLY INCOME</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.monthlyIncome}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>LOAN REPAYMENT</p>
                  <p className={styles.infoValue}>{user.educationAndEmployment.loanRepayment}</p>
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Socials</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>TWITTER</p>
                  <p className={styles.infoValue}>{user.socials.twitter}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>FACEBOOK</p>
                  <p className={styles.infoValue}>{user.socials.facebook}</p>
                </div>
                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>INSTAGRAM</p>
                  <p className={styles.infoValue}>{user.socials.instagram}</p>
                </div>
              </div>
            </section>

            {/* Guarantors */}
            {user.guarantors.map((guarantor, index) => (
              <section key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>Guarantor {index + 1}</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>FULL NAME</p>
                    <p className={styles.infoValue}>{guarantor.fullName}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>PHONE NUMBER</p>
                    <p className={styles.infoValue}>{guarantor.phoneNumber}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>EMAIL ADDRESS</p>
                    <p className={styles.infoValue}>{guarantor.emailAddress}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>RELATIONSHIP</p>
                    <p className={styles.infoValue}>{guarantor.relationship}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Other tabs - Placeholder content */}
        {activeTab !== 'general' && (
          <div className={styles.detailsCard}>
            <p className={styles.placeholderText}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} details coming soon...
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default UserDetails

