# Gpa = (sum of (grade * credit unit)) / (sum of credit unit)

scores = [{'grade': 5.0, 'credit_unit': 3},{'grade': 5.0, 'credit_unit': 3},{'grade': 5.0, 'credit_unit': 3},{'grade': 5.0, 'credit_unit': 3},{'grade': 5.0, 'credit_unit': 3},{'grade': 5.0, 'credit_unit': 3},]

def calculate_gpa(points):
    total_quality_points = 0 
    total_credit_units = 0   
    for i in range(len(points)):
        total_quality_points += points[i]['grade'] * points[i]['credit_unit']
        total_credit_units += points[i]['credit_unit']
    print(total_quality_points/total_credit_units)
        
    

calculate_gpa(scores)



