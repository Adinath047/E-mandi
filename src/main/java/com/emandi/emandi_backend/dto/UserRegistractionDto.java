package com.emandi.emandi_backend.dto;


import com.emandi.emandi_backend.entity.User;
import com.emandi.emandi_backend.entity.BuyerProfile;
import lombok.Data;
import java.util.List;

@Data
public class UserRegistractionDto {
    // User basic info
    private String fullName;
    private String phoneNumber;
    private String email;
    private String password;
    private User.UserType userType;
    private String state;
    private String district;
    private String address;

    // KYC info
    private String aadhaarNumber;
    private String panNumber;

    // Bank details
    private String bankName;
    private String accountHolderName;
    private String accountNumber;
    private String ifscCode;

    // Farmer specific
    private Double farmSize;
    private Integer farmingExperience;
    private List<String> primaryCommodities;
    private String farmType;
    private Boolean organicCertified;

    // Buyer specific
    private String companyName;
    private BuyerProfile.BusinessType businessType;
    private String gstNumber;
    private String cinNumber;
    private List<String> interestedCommodities;
    private Integer yearsInBusiness;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User.UserType getUserType() {
        return userType;
    }

    public void setUserType(User.UserType userType) {
        this.userType = userType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public Double getFarmSize() {
        return farmSize;
    }

    public void setFarmSize(Double farmSize) {
        this.farmSize = farmSize;
    }

    public Integer getFarmingExperience() {
        return farmingExperience;
    }

    public void setFarmingExperience(Integer farmingExperience) {
        this.farmingExperience = farmingExperience;
    }

    public List<String> getPrimaryCommodities() {
        return primaryCommodities;
    }

    public void setPrimaryCommodities(List<String> primaryCommodities) {
        this.primaryCommodities = primaryCommodities;
    }

    public String getFarmType() {
        return farmType;
    }

    public void setFarmType(String farmType) {
        this.farmType = farmType;
    }

    public Boolean getOrganicCertified() {
        return organicCertified;
    }

    public void setOrganicCertified(Boolean organicCertified) {
        this.organicCertified = organicCertified;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public BuyerProfile.BusinessType getBusinessType() {
        return businessType;
    }

    public void setBusinessType(BuyerProfile.BusinessType businessType) {
        this.businessType = businessType;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getCinNumber() {
        return cinNumber;
    }

    public void setCinNumber(String cinNumber) {
        this.cinNumber = cinNumber;
    }

    public List<String> getInterestedCommodities() {
        return interestedCommodities;
    }

    public void setInterestedCommodities(List<String> interestedCommodities) {
        this.interestedCommodities = interestedCommodities;
    }

    public Integer getYearsInBusiness() {
        return yearsInBusiness;
    }

    public void setYearsInBusiness(Integer yearsInBusiness) {
        this.yearsInBusiness = yearsInBusiness;
    }
}
