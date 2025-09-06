# IQ Scoring System Documentation

## Overview

The Test Your Genius platform uses a sophisticated IQ scoring algorithm that converts test performance percentages into standardized IQ scores ranging from 80 to 155 points. This document outlines the complete scoring methodology, brackets, and classification system.

## Scoring Algorithm

### Base Formula
The IQ score is calculated using a tiered percentage-based system that provides more granular scoring at higher performance levels:

```javascript
function calculateIQScore(correctAnswers, totalQuestions) {
    const percentage = (correctAnswers / totalQuestions) * 100;
    let iqScore;
    
    if (percentage >= 95) {
        iqScore = 145 + ((percentage - 95) * 2); // 145-155 for 95-100%
    } else if (percentage >= 90) {
        iqScore = 135 + ((percentage - 90) * 2); // 135-145 for 90-95%
    } else if (percentage >= 80) {
        iqScore = 120 + ((percentage - 80) * 1.5); // 120-135 for 80-90%
    } else if (percentage >= 70) {
        iqScore = 110 + ((percentage - 70) * 1); // 110-120 for 70-80%
    } else if (percentage >= 60) {
        iqScore = 100 + ((percentage - 60) * 1); // 100-110 for 60-70%
    } else if (percentage >= 50) {
        iqScore = 90 + ((percentage - 50) * 1); // 90-100 for 50-60%
    } else {
        iqScore = 80 + (percentage * 0.2); // 80-90 for 0-50%
    }
    
    return Math.round(iqScore);
}
```

## IQ Score Brackets & Classifications

### Exceptional Range
| Percentage Range | IQ Score Range | Classification | Description |
|-----------------|----------------|----------------|-------------|
| 95-100% | 145-155 | **Exceptional Genius** | Outstanding cognitive ability, representing the top 0.1-2% of the population |

### Superior Range
| Percentage Range | IQ Score Range | Classification | Description |
|-----------------|----------------|----------------|-------------|
| 90-95% | 135-145 | **Analytical Genius** | Highly superior intelligence, top 2-10% of population |
| 80-90% | 120-135 | **Superior Intelligence** | Above average to superior cognitive abilities |

### Above Average Range
| Percentage Range | IQ Score Range | Classification | Description |
|-----------------|----------------|----------------|-------------|
| 70-80% | 110-120 | **Above Average Intelligence** | Higher than average cognitive performance |

### Average Range
| Percentage Range | IQ Score Range | Classification | Description |
|-----------------|----------------|----------------|-------------|
| 60-70% | 100-110 | **Average Intelligence** | Typical cognitive abilities, represents majority of population |
| 50-60% | 90-100 | **Average Intelligence** | Normal range of cognitive function |

### Developing Range
| Percentage Range | IQ Score Range | Classification | Description |
|-----------------|----------------|----------------|-------------|
| 0-50% | 80-90 | **Developing Intelligence** | Indicates potential for growth and development |

## Key Features of the Scoring System

### 1. Progressive Scaling
- **Higher sensitivity at top levels**: More points awarded for excellence (95-100% range)
- **Balanced middle ranges**: Steady progression through average performance levels
- **Encouraging minimum**: Even 0% performance yields 80 IQ, maintaining motivation

### 2. Realistic Distribution
- Aligns with standardized IQ test distributions
- Provides meaningful differentiation across all performance levels
- Avoids extreme scores that might seem unrealistic

### 3. Motivational Design
- **Minimum Score**: 80 IQ (never goes below this threshold)
- **Maximum Score**: 155 IQ (achievable excellence marker)
- **Positive Terminology**: "Developing Intelligence" instead of negative classifications

## Examples

### Perfect Performance
- **25/25 correct (100%)** → **155 IQ** → **Exceptional Genius**

### High Performance
- **23/25 correct (92%)** → **139 IQ** → **Analytical Genius**

### Average Performance
- **15/25 correct (60%)** → **100 IQ** → **Average Intelligence**

### Low Performance
- **0/25 correct (0%)** → **80 IQ** → **Developing Intelligence**

## Implementation Notes

### Dashboard Integration
The scoring system is implemented in:
- `dashboard.html` - Main calculation function
- `calculating-results.html` - Score processing during test completion
- `pages/results.html` - Detailed results display

### Data Flow
1. **Test Completion**: User answers stored in `iqTestResults.questionData`
2. **Score Calculation**: Percentage computed from correct answers
3. **IQ Conversion**: Percentage mapped to IQ score using tiered algorithm
4. **Classification**: IQ score mapped to genius type description
5. **Display**: Results shown across dashboard and results pages

### Storage
- **localStorage key**: `iqTestScore`
- **Associated data**: `geniusType`, `iqTestResults`
- **Persistence**: Maintained across sessions until test retaken

## Validation & Testing

### Test Cases
| Input | Expected Output | Classification |
|-------|----------------|----------------|
| 25/25 (100%) | 155 IQ | Exceptional Genius |
| 24/25 (96%) | 147 IQ | Exceptional Genius |
| 23/25 (92%) | 139 IQ | Analytical Genius |
| 20/25 (80%) | 120 IQ | Superior Intelligence |
| 15/25 (60%) | 100 IQ | Average Intelligence |
| 12/25 (48%) | 90 IQ | Developing Intelligence |
| 0/25 (0%) | 80 IQ | Developing Intelligence |

## Future Considerations

### Potential Enhancements
1. **Adaptive Difficulty**: Adjust scoring based on question complexity
2. **Time Factors**: Incorporate response time into scoring
3. **Category Analysis**: Separate scores for logical, spatial, and verbal reasoning
4. **Demographic Adjustments**: Age or education-based calibrations

### Maintenance
- Regular validation against standardized IQ test distributions
- User feedback incorporation for classification terminology
- Performance monitoring for scoring algorithm effectiveness

---

*Last Updated: September 6, 2025*  
*Version: 1.0*  
*Author: Test Your Genius Development Team*
