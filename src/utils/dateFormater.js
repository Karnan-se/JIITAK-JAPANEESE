
export const formatDateJP = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
  
    return `${year}年 ${month}月 ${day}日`
  }
  
  
   
  export const parseJPDate = (dateString) => {
    
    const yearMatch = dateString.match(/(\d+)年/)
    const monthMatch = dateString.match(/(\d+)月/)
    const dayMatch = dateString.match(/(\d+)日/)
  
    if (!yearMatch || !monthMatch) {
      throw new Error("Invalid date format")
    }
  
    const year = Number.parseInt(yearMatch[1])
    const month = Number.parseInt(monthMatch[1]) - 1 
    const day = dayMatch ? Number.parseInt(dayMatch[1]) : 1 
  
    return new Date(year, month, day)
  }
  
  