def get_crop_health_summary():
    """
    Simulated summary of ML crop health predictions.
    Later this will come from DB.
    """

    # Example ML results
    predictions = [
        "Tomato___healthy",
        "Tomato___healthy",
        "Potato___Late_blight",
        "Apple___healthy",
        "Corn___Common_rust",
        "Corn___healthy",
        "Tomato___healthy",
        "Potato___healthy",
    ]

    total_fields = len(predictions)
    healthy_fields = sum(1 for p in predictions if "healthy" in p.lower())
    diseased_fields = total_fields - healthy_fields

    healthy_percentage = int((healthy_fields / total_fields) * 100)

    return {
        "total_fields": total_fields,
        "healthy_fields": healthy_fields,
        "diseased_fields": diseased_fields,
        "healthy_percentage": healthy_percentage,
    }
