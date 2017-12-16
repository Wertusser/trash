from rest_framework import serializers
from mom_lovers.models import Thread, Post


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('id', 'title', 'lead', 'username', 'created')

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    lead = serializers.CharField(required=True, allow_blank=False, max_length=500)
    username = serializers.CharField(required=False, allow_blank=True, max_length=30)

    def create(self, validated_data):
        """
        Create and return a new `Title` instance, given the validated data.
        """
        return Thread.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Title` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.lead = validated_data.get('lead', instance.lead)
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'thread_id', 'title', 'lead', 'username', 'created')

    id = serializers.IntegerField(read_only=True)
    thread_id = serializers.IntegerField(required=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    lead = serializers.CharField(required=True, allow_blank=False, max_length=500)
    username = serializers.CharField(required=False, allow_blank=True, max_length=30)

    def create(self, validated_data):
        """
        Create and return a new `Post` instance, given the validated data.
        """
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Post` instance, given the validated data.
        """
        instance.thread_id = validated_data.get('thread_id', instance.thread_id)
        instance.title = validated_data.get('title', instance.title)
        instance.lead = validated_data.get('lead', instance.lead)
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance
